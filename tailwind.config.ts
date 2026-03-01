import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F766E",
          foreground: "#F8FAFC"
        }
      }
    }
  },
  plugins: []
};

export default config;
