/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FCCD2A",         // Bright Yellow
        "deep-green": "#347928",      // Forest Green
        "light-green": "#C0EBA6",     // Pale Mint Green
        "off-white": "#FFFBE6",       // Cream Background
        "background-light": "#FFFBE6",
        "background-dark": "#1a3c14",  // Dark Forest Green
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}