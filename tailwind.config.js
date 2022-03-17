/* eslint-disable */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      ...colors,
      primary: "#323259",
      secondary: "#13132b",
      third: "#1B1B38",
    },
    extend: {
      backgroundImage: {
        "default-image": "url('../public/default-image.jpg')",
      },
    },
  },
  plugins: [],
};
