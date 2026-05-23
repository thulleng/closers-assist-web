import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customer = searchParams.get("customer") || "Another one";
  const commission = searchParams.get("commission") || "0";
  const dealType = searchParams.get("type") || "Deal";
  const repName = searchParams.get("rep") || "A Closer";
  const units = searchParams.get("units") || "1";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1080,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #050506 0%, #0a1628 50%, #050506 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 200,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "60px 64px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Top: Logo + Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "auto" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #10B981, #00FF88)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
                color: "#050506",
              }}
            >
              C
            </div>
            <span style={{ color: "#A0A0A0", fontSize: 18, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
              Closers Assist
            </span>
          </div>

          {/* Center: Deal announcement */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            {/* Checkmark circle */}
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
                border: "2px solid rgba(16,185,129,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Deal type badge */}
            <div
              style={{
                padding: "8px 24px",
                borderRadius: 100,
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#10B981",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {dealType.toUpperCase()}
            </div>

            {/* Customer name */}
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#FFFFFF",
                textAlign: "center",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              {customer}
            </div>

            {/* Commission */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginTop: 12,
              }}
            >
              <span style={{ fontSize: 28, color: "#6B7280", fontWeight: 600 }}>Closed at</span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  background: "linear-gradient(180deg, #00FF88, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                ${parseInt(commission).toLocaleString()}
              </span>
            </div>

            {/* Units */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, color: "#6B7280", fontSize: 20, fontWeight: 500 }}>
              <span>{units} {parseInt(units) === 1 ? "unit" : "units"}</span>
              <span>·</span>
              <span>+Comm</span>
            </div>
          </div>

          {/* Bottom: Rep info + referral */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ color: "#6B7280", fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
              Closed by
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 700 }}>
              {repName}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 20,
                padding: "12px 32px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get your AI closer at closersassist.com
            </div>

            {/* Tagline */}
            <div style={{ color: "#4B5563", fontSize: 13, fontWeight: 500, marginTop: 12 }}>
              The AI employee every closer owns.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}
