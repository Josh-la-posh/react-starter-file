/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'priColor': '#00A049',
          'secColoor': '#23BF76'
        }
      },
    },
    plugins: [require('tailwind-scrollbar')],
  }
  
  