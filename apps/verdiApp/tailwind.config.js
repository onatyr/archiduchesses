/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          50: '#f1f8ed',
          100: '#dff0d7',
          200: '#c1e3b3',
          300: '#9bd086',
          400: '#79bb60',
          500: '#5faa46',
          600: '#437f31',
          700: '#356229',
          800: '#2e4f25',
          900: '#294423',
          950: '#13240f',
        },
      },
    },
  },
  plugins: [],
};
