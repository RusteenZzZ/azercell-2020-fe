/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');

module.exports = {
  important: '#root',
  mode: 'jit',
  purge: ['src/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    colors: {
      ...colors,
    },
    zIndex: {
      0: 0,
      1: 1,
      10: 1100,
      20: 1200,
      30: 1300,
      40: 1400,
      50: 1500,
      auto: 'auto',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff7900',
          5: '#FFD2B5',
        },
        transparent: 'transparent',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
