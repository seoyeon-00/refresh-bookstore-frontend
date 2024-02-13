const { keyframes } = require("styled-components");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        point: "#1DC078",
        black: "#111111",
        dark_gray: "#7d7d7d",
        gray: "#bfbfbf",
        light_gray: "#e7e7e7",
        light_green: "#b7fbdc",
        dark_green: "#16a263",
        red: "#FF0000",
      },
      fontSize: {
        large: "30px",
        medium: "20px",
        regular: "16px",
        small: "14px",
        semi_micro: "12px",
        micro: "10px",
      },
      animation: {
        up: "up 1s ease-in-out forwards",
        graduallySizeUp: "graduallySizeUp 1s ease-in-out forwards",
      },
      keyframes: {
        up: {
          "0%": {
            transform: "translateY(6px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        graduallySizeUp: {
          "0%": {
            width: "10px",
            height: "10px",
            borderRadius: "100px",
            transformOrigin: "center center",
            left: "50%",
            top: "50%",
          },
          "100%": {
            width: "100vw",
            height: "100vh",
            transformOrigin: "center center",
            left: 0,
            top: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
