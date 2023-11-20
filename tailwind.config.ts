import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      smMd: "1200px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      // => @media (min-width: 1536px) { ... }
    },
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
      "science-blue": {
        "50": "#f2f7fd",
        "100": "#e3ecfb",
        "200": "#c1daf6",
        "300": "#8abbef",
        "400": "#4b98e5",
        "500": "#247bd3",
        "600": "#1765be",
        "700": "#134c91",
        "800": "#144278",
        "900": "#163864",
        "950": "#0f2442",
      },
      red: {
        "50": "#fff0f0",
        "100": "#ffdddd",
        "200": "#ffc0c0",
        "300": "#ff9494",
        "400": "#ff5757",
        "500": "#ff2323",
        "600": "#ff0000",
        "700": "#d70000",
        "800": "#b10303",
        "900": "#920a0a",
        "950": "#500000",
      },
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
