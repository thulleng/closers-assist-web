import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Closers Assist brand tokens
        pit: "#050506",
        slate: "#141417",
        iron: "#2A2A2F",
        bone: "#F5F5F4",
        ash: "#A1A1AA",
        muted: "#52525B",
        deal: {
          DEFAULT: "#10B981",
          hover: "#059669",
          light: "#6EE7B7",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          pale: "#FDE68A",
          dark: "#D97706",
        },
        warn: "#F59E0B",
        alert: "#E11D2E",
        // Futuristic AI accents
        void: "#020203",
        "neon-green": "#00FF88",
        "neon-cyan": "#00E5FF",
        "neon-purple": "#7B2FFF",
        "glass-white": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 6px currentColor)",
          },
          "50%": {
            opacity: "0.6",
            filter: "drop-shadow(0 0 20px currentColor)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.05)" },
        },
        "grid-scroll": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(48px, 48px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.14" },
          "50%": { transform: "scale(1.03)", opacity: "0.17" },
        },
        "subtle-drift": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -5px)" },
          "50%": { transform: "translate(5px, 10px)" },
          "75%": { transform: "translate(-5px, 5px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -0.5%)" },
        },
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        float: "float 3.5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "grid-scroll": "grid-scroll 20s linear infinite",
        "scan-line": "scan-line 3s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        "breathe": "breathe 6s ease-in-out infinite",
        "subtle-drift": "subtle-drift 20s linear infinite",
        "kenburns": "kenburns 30s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "ai-gradient":
          "radial-gradient(ellipse 1000px 600px at 20% 0%, rgba(0, 255, 136, 0.12) 0%, transparent 55%), radial-gradient(ellipse 800px 500px at 80% 100%, rgba(123, 47, 255, 0.1) 0%, transparent 55%), radial-gradient(circle 500px at 50% 50%, rgba(0, 229, 255, 0.06) 0%, transparent 55%)",
      },
    },
  },
  plugins: [],
};
export default config;
