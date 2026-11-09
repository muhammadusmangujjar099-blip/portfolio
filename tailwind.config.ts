import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0B0F17", // base
        obsidian: "#131927", // cards
        cyber: { DEFAULT: "#00F0FF", dim: "#00B8C4" }, // accent
        mist: "#94A3B8", // muted text
        ink: "#E6EDF7", // primary text
        line: "rgba(148, 163, 184, 0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 14px -4px rgba(0, 240, 255, 0.5)",
        glow: "0 0 26px -6px rgba(0, 240, 255, 0.55)",
        "glow-lg": "0 0 38px -4px rgba(0, 240, 255, 0.65)",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        "line-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
        "flow-x": {
          "0%": { left: "0%", opacity: "0" },
          "15%, 85%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        "flow-y": {
          "0%": { top: "0%", opacity: "0" },
          "15%, 85%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
        "line-in": "line-in 220ms ease-out both",
        "flow-x": "flow-x 1.8s linear infinite",
        "flow-y": "flow-y 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
