/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './plugins/formulate.config.js'
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1240px'
        }

      },
      margin: {
        h1: '1rem 0rem',
        h2: '1rem 0rem',
        h3: '0.75rem 0rem',
        h4: '0.75rem 0rem',
        h5: '0.5rem 0rem',
        h6: '0.5rem 0rem',
        hr: '1rem',
        p: '1rem'
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.h1'), margin: theme('margin.h1') },
        h2: { fontSize: theme('fontSize.h2'), margin: theme('margin.h2') },
        h3: { fontSize: theme('fontSize.h3'), margin: theme('margin.h3') },
        h4: { fontSize: theme('fontSize.h4'), margin: theme('margin.h4') },
        h5: { fontSize: theme('fontSize.h5'), margin: theme('margin.h5') },
        h6: { fontSize: theme('fontSize.h6'), margin: theme('margin.h6') },
        hr: { marginTop: theme('margin.hr'), marginBottom: theme('margin.hr') },
        p: { marginBottom: theme('margin.p') },
        svg: { display: 'inline' }
      })
    }
  ]
}
