tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          200: '#c3eed2',
          300: '#94e0b3',
          400: '#5cc98d',
          500: '#34ae6f',
          600: '#258c57',
          700: '#207047',
          800: '#1d593b',
          900: '#194932',
          950: '#0b281b',
        },
        beige: {
          50: '#fbfaf8',
          100: '#f5f3ef',
          200: '#ebe6de',
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
      },
      boxShadow: {
        'up': '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(220, 38, 38, 0.5)', /* Red glow */
      },
      animation: {
        'shake-ring': 'shake 2s infinite ease-in-out', /* Hiệu ứng rung */
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0) scale(1) skew(1deg)' },
          '5%': { transform: 'rotate(-25deg) scale(1.1) skew(1deg)' },
          '10%': { transform: 'rotate(25deg) scale(1.1) skew(1deg)' },
          '15%': { transform: 'rotate(-25deg) scale(1.1) skew(1deg)' },
          '20%': { transform: 'rotate(25deg) scale(1.1) skew(1deg)' },
          '25%': { transform: 'rotate(0) scale(1) skew(1deg)' },
          '100%': { transform: 'rotate(0) scale(1) skew(1deg)' }
        }
      }
    }
  }
}
