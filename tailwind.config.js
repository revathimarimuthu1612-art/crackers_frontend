/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F9D0D8',
          300: '#F3A8B7',
          400: '#E8718A',
          500: '#D94364',
          600: '#B92849',
          700: '#941B35',
          800: '#7A182D',
          900: '#54111E',
          950: '#330811',
        },
        festive: {
          red: '#C82A2A',
          maroon: '#7A182D',
          orange: '#E8590C',
          amber: '#F59E0B',
          gold: '#D4AF37',
          goldlight: '#FDE68A',
          cream: '#FDFBF7',
          creambg: '#F7F4EC',
          charcoal: '#15161A',
          carddark: '#1E2026',
          borderdark: '#2E323D',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'festive': '0 4px 20px -2px rgba(185, 40, 73, 0.15)',
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
