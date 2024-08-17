/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  prefix: 'tw-',
  theme: {
    extend: {
      fontSize: {
        h1: '2.25rem', // 36px
        h2: '1.875rem', // 30px
        h3: '1.5rem', // 24px
        h4: '1.25rem', // 20px
        h5: '1rem', // 16px
        h6: '0.875rem' // 14px
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.h1') },
        h2: { fontSize: theme('fontSize.h2') },
        h3: { fontSize: theme('fontSize.h3') },
        h4: { fontSize: theme('fontSize.h4') },
        h5: { fontSize: theme('fontSize.h5') },
        h6: { fontSize: theme('fontSize.h6') }
      })
    }
  ]
}
