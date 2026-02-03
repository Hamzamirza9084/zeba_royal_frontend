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
        "primary": "#FCCD2A",
        "deep-green": "#347928",
        "light-green": "#C0EBA6",
        "off-white": "#FFFBE6",
        "background-light": "#FFFBE6",
        "background-dark": "#1a3c14",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}