import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "base-color": "#1765be",
      "title-darkModeColor": "#fff",
      white: "#fff",
      black: "#090A0A",
      gray: "#f7f7f7",
      textGray: "#667472",
      borderGray: "#ebebeb",
      productTextColor: "#555",
      priceColor: "#3c9cdc",
    },
    fontFamily: {
      productTextFont: ["FjallaOneRegular"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
