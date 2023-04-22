/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#212434',
        'bg-light': '#3F446F',
        'yellow': '#FFD082',
        'red': '#FF8282',
        'silver': '#BBBBBB',
        'alto': '#D7D7D7',
      }
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};

