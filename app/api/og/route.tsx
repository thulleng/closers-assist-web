import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050506 0%, #0a1628 50%, #050506 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              color: "#fff",
            }}
          >
            DEAL
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.15em",
              color: "#10B981",
              textShadow: "0 0 20px rgba(16,185,129,0.5)",
            }}
          >
            CLOZR
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          The AI agent every closer owns.
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            marginTop: 16,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Built on the floor by a working rep. $29.99/rep/mo.
        </div>

        {/* Price badge */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 12,
            padding: "12px 28px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#10B981",
            }}
          >
            $29.99
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            / rep / mo
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
