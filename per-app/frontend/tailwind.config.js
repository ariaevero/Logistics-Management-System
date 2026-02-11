/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6ecf5',
          500: '#0f3b6f',
          700: '#0b2d55'
        }
      }
    }
  },
  plugins: []
};
