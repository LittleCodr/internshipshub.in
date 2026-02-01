/*************************************************************
 * Tailwind configuration keeps the purge target minimal to
 * ensure the bundle remains lean and Lighthouse scores stay high.
 *************************************************************/
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx,md}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f172a",
          accent: "#2563eb",
          soft: "#1e293b"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
