const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const ProjectUtilities = plugin(({ addUtilities }) => {
  addUtilities({
    '.flip-horizontal': {
      transform: 'rotateY(180deg)',
    },
    '.flip-vertical': {
      transform: 'rotateX(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        twinkle: 'twinkleFrames 200s linear infinite',
        wiggle: 'wiggle 200ms ease-in-out',
      },
      colors: {
        navy: {
          50: '#CCD2DC',
          100: '#B3BCCB',
          200: '#99A6B9',
          300: '#808FA7',
          400: '#667995',
          500: '#334C70',
          600: '#1A365D',
          700: '#00204A',
          800: '#001839',
          900: '#001028',
        },
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        title: ['Megrim'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        twinkleFrames: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-10000px 5000px' },
        },
      },
    },
  },
  plugins: [ProjectUtilities],
}
