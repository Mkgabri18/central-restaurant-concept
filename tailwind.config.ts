import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121621",
        accent: {
          DEFAULT: "#508ef2",
          light: "#78abf8",
          dark: "#336ad6",
          glow: "rgba(80, 142, 242, 0.25)",
        },
        surface: {
          DEFAULT: "#181e2d",
          elevated: "#21293c",
          glass: "rgba(18, 22, 33, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, rgba(80, 142, 242, 0.12) 0%, transparent 70%)",
        "radial-top": "radial-gradient(ellipse at 50% 0%, rgba(80, 142, 242, 0.15) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
