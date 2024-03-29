/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--inter-font)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
