/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./public/index.html"
    ]
  },
  theme: {
    extend: {
      colors: {
        primary: "#0093ff",
        secondary: "#4d4d4d",
        tertiary: "#c9c9c9"
      }
    }
  },
  plugins: []
};
