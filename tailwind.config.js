/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#777C5C',
          dark: '#64684d',
          darker: '#51543f',
        },
        cream: '#EFE6D7',
        sand: '#F4EBE1',
        forest: 'rgba(20, 44, 18, 1)',
      },
      fontFamily: {
        tenor: ['"Tenor Sans"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
