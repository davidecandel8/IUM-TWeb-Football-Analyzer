// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "././src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       'logo': ["Orbitron", "sans-serif"],
      },
      colors: {
        grey1: '#B3B3B3',
        grey2: '#535353',
        grey3: '#212121',
        myGreen: '#1bd954'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
