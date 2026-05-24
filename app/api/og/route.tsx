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
          background: "linear-gradient(135deg, #050506 0%, #0a1628 40%, #050506 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='0.4'%3E%3Cpath d='M20 0v40M0 20h40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large green glow orb — upper right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)",
          }}
        />

        {/* Gold glow orb — lower left */}
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.1), transparent 70%)",
          }}
        />

        {/* Pink accent — center top */}
        <div
          style={{
            position: "absolute",
            top: -50,
            left: "40%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%)",
          }}
        />

        {/* Hexagonal tech detail */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 40,
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 16,
            background: "rgba(16,185,129,0.04)",
            fontSize: 40,
            fontWeight: 900,
            color: "rgba(16,185,129,0.2)",
          }}
        >
          AI
        </div>

        {/* Main content area — centered */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          {/* Brand bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              padding: "8px 20px",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 100,
              background: "rgba(16,185,129,0.06)",
            }}
          >
            {/* Logo square */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "linear-gradient(135deg, #10B981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              DC
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#9ca3af" }}>
              DEAL <span style={{ color: "#10B981" }}>CLOZR</span>
            </div>
          </div>

          {/* Main headline — BIG */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Your AI closer.
            <br />
            <span style={{ color: "#10B981", textShadow: "0 0 30px rgba(16,185,129,0.4)" }}>
              She closes. You collect.
            </span>
          </div>

          {/* Sub */}
          <div
            style={{
              fontSize: 22,
              color: "#9ca3af",
              marginTop: 16,
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            An AI employee that handles your deals, your pay plan, your follow-ups — and your life.
          </div>

          {/* Bottom row: stat badges */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 16,
            }}
          >
            {[
              { label: "18 INDUSTRIES", value: "18" },
              { label: "FROM $29.99", value: "$29" },
              { label: "BUILT ON THE FLOOR", value: "FLOOR" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 900, color: "#10B981" }}>{s.value}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6b7280" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain line */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 40,
            fontSize: 12,
            color: "#4b5563",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          dealclozr.com
        </div>

        {/* Bottom right — built on the floor tag */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 40,
            fontSize: 11,
            color: "#4b5563",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          BUILT ON THE SALES FLOOR
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
