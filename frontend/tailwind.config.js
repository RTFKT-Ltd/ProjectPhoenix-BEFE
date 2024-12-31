/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rtfkt-purple': '#6E56CF',
        'rtfkt-dark': '#13111C'
      }
    },
  },
  plugins: [],
}