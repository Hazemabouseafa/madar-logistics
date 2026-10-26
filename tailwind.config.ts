import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        madar: {
          dark: "#070F1E",
          navy: "#0B192C",
          blue: "#1E3E62",
          lightBlue: "#2A5282",
          gold: "#F59E0B",
          goldHover: "#D97706",
          amber: "#FBBF24",
          silver: "#94A3B8",
          card: "#0F2038",
          cardBorder: "#1E3A5F",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "sans-serif"],
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-gold": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "glow-blue": "0 0 35px -5px rgba(30, 62, 98, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
