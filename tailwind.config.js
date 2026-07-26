/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6',
        walnut: '#8B4513',
        amber: '#C4956A',
        chocolate: '#3D2314',
        tan: '#F0E6DA',
        navy: '#1E293B',
        burgundy: '#4A1C2B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(61, 35, 20, 0.08)',
        'card-hover': '0 8px 32px rgba(61, 35, 20, 0.14)',
      },
    },
  },
  plugins: [],
}
