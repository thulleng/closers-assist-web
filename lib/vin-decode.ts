// ── VIN Decode Utility (NHTSA VPIC API) ─────────────────────────────────────
// Free, no API key required.
// Docs: https://vpic.nhtsa.dot.gov/api/

export interface VinDecodeResult {
  success: true;
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  bodyClass: string;
  engine: string;
  displacement: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  msrp: string | null;
  raw: Record<string, string>;
}

export interface VinDecodeError {
  success: false;
  vin: string;
  error: string;
}

type VinDecodeResponse = VinDecodeResult | VinDecodeError;

/**
 * Basic VIN validation: 17 chars, alphanumeric, no I, O, Q, U, Z (in position 10).
 * We're lenient — let NHTSA reject truly invalid VINs.
 */
export function isValidVin(vin: string): boolean {
  const cleaned = vin.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (cleaned.length !== 17) return false;
  // No I, O, Q in VINs
  if (/[IOQ]/.test(cleaned)) return false;
  return true;
}

/**
 * Clean a raw input to extract a VIN.
 * Accepts: "VIN: 1HGCM82633A004352", "/vin 1HGCM82633A004352", bare VIN, etc.
 */
export function extractVin(text: string): string | null {
  // Remove common prefixes
  let cleaned = text
    .replace(/^\/vin\s*/i, "")
    .replace(/^vin\s*:?\s*/i, "")
    .replace(/^vin#\s*/i, "")
    .trim();

  // VIN is typically 17 alphanumeric chars
  const match = cleaned.match(/\b([A-HJ-NPR-Z0-9]{17})\b/i);
  if (match && isValidVin(match[1])) {
    return match[1].toUpperCase();
  }

  // Try the whole string after removing spaces/dashes
  const bare = cleaned.replace(/[\s\-]/g, "").toUpperCase();
  if (isValidVin(bare)) return bare;

  return null;
}

/** Fields we care about from NHTSA results */
const INTERESTING_VARIABLES = new Set([
  "Make",
  "Model",
  "Model Year",
  "Trim",
  "Series",
  "Body Class",
  "Vehicle Type",
  "Engine Model",
  "Engine Cylinders",
  "Displacement (L)",
  "Displacement (CC)",
  "Fuel Type - Primary",
  "Transmission Style",
  "Drive Type",
  "Manufacturer MSRP",
  "Manufacturer Suggested Retail Price",
  "Base Price",
  "Wheel Base (inches)",
  "Seats",
  "Curtain Air Bag Locations",
  "Seat Belts Type",
]);

/**
 * Decode a VIN via NHTSA VPIC API.
 * Returns formatted vehicle info or an error.
 */
export async function decodeVin(vin: string): Promise<VinDecodeResponse> {
  const cleaned = vin.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (!isValidVin(cleaned)) {
    return {
      success: false,
      vin: cleaned,
      error:
        "Invalid VIN format. A valid VIN is 17 characters (letters and numbers, no I, O, or Q).",
    };
  }

  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${cleaned}?format=json`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!res.ok) {
      return {
        success: false,
        vin: cleaned,
        error: `NHTSA API returned status ${res.status}. Try again.`,
      };
    }

    const data = await res.json();
    const results: Array<{ Variable: string; Value: string | null }> =
      data.Results || [];

    // Build a map of all variables
    const map: Record<string, string> = {};
    for (const r of results) {
      if (r.Value) {
        map[r.Variable] = r.Value;
      }
    }

    // Check if the VIN was actually decoded
    const make = map["Make"] || "";
    const model = map["Model"] || "";
    const year = map["Model Year"] || "";

    if (!make && !model) {
      // Maybe it's a valid format but NHTSA couldn't decode it
      const errorText = results.find(
        (r) => r.Variable === "Error Code" || r.Variable === "Error Text"
      )?.Value;
      return {
        success: false,
        vin: cleaned,
        error: errorText
          ? `Could not decode: ${errorText}`
          : "Could not decode this VIN. It may be invalid or too new for the database.",
      };
    }

    // Extract MSRP — try different field names
    const msrp =
      map["Manufacturer MSRP"] ||
      map["Manufacturer Suggested Retail Price"] ||
      map["Base Price"] ||
      null;

    const result: VinDecodeResult = {
      success: true,
      vin: cleaned,
      year,
      make,
      model,
      trim: map["Trim"] || map["Series"] || "",
      bodyClass: map["Body Class"] || map["Vehicle Type"] || "",
      engine: map["Engine Model"] || "",
      displacement: map["Displacement (L)"] || map["Displacement (CC)"] || "",
      fuelType: map["Fuel Type - Primary"] || "",
      transmission: map["Transmission Style"] || "",
      driveType: map["Drive Type"] || "",
      msrp,
      raw: map,
    };

    return result;
  } catch (err: any) {
    return {
      success: false,
      vin: cleaned,
      error: `VIN lookup failed: ${err.message || "Unknown error"}`,
    };
  }
}

/**
 * Format a decoded VIN into a nice Telegram Markdown response.
 */
export function formatVinResponse(result: VinDecodeResult): string {
  const lines: string[] = [];
  const title = [result.year, result.make, result.model].filter(Boolean).join(" ");
  lines.push(`🚗 *${title}*`);

  if (result.trim) lines.push(`*Trim:* ${result.trim}`);
  if (result.bodyClass) lines.push(`*Body:* ${result.bodyClass}`);

  const specLines: string[] = [];
  if (result.engine) {
    const disp = result.displacement
      ? result.displacement.includes("L")
        ? ` ${result.displacement}`
        : ` (${result.displacement})`
      : "";
    specLines.push(`${result.engine}${disp}`);
  }
  if (result.fuelType) specLines.push(result.fuelType);
  if (result.transmission) specLines.push(result.transmission);
  if (result.driveType && result.driveType !== "4x2" && !result.driveType.includes("All")) {
    // Skip generic drive types
  }

  if (specLines.length) {
    lines.push(`*Drivetrain:* ${specLines.join(" · ")}`);
  }

  if (result.msrp) {
    const msrpNum = result.msrp.replace(/[^0-9.]/g, "");
    if (msrpNum) {
      lines.push(`\n💰 *MSRP:* $${parseInt(msrpNum).toLocaleString()}`);
    } else {
      lines.push(`\n💰 *MSRP:* ${result.msrp}`);
    }
  }

  lines.push(`\n\`${result.vin}\``);
  lines.push("");
  lines.push("_Looking for a deal on this? Ask me to negotiate._ 🤝");

  return lines.join("\n");
}

/**
 * Format a VIN error for Telegram.
 */
export function formatVinError(error: string): string {
  return `❌ *VIN Lookup Failed*\n\n${error}\n\nTry: \`/vin 1HGCM82633A004352\``;
}
