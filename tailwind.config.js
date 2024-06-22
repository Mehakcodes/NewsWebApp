/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    extend: {
      colors:{
        'blk':'#010001',
        'wht':'#fffefe',
        'pallete-600':'#8B211F',
        'pallete-500':'#9D2F2D',
        'pallete-400':'#B04C4A',
        'pallete-300':'#D2716F',
        'pallete-200':'#D18281',
        'pallete-100':'#DFA6A5',
      },
      screens: {
        'xs': "370px",

      }
     
    },
  },
  plugins: [],
}
