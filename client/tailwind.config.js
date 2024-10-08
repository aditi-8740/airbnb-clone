/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "rgb(255,56,92)",

      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

