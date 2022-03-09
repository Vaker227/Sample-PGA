/* eslint-disable */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#323259",
      secondary: "#13132b",
      third: "#1B1B38",
    },
  },
  plugins: [],
};
