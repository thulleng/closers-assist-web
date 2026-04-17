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
    },
  },
  plugins: [],
};
export default config;
