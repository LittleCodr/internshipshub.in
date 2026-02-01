import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0C3B2E",
          foreground: "#F4FFF9"
        },
        accent: {
          DEFAULT: "#F9B233",
          foreground: "#2E2100"
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
