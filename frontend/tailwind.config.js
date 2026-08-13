/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        panel: '#101010',
        line: '#252525',
        mist: '#a7a7a7',
        teal: '#f5f5f5',
        amber: '#7a7a7a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 30px 100px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
