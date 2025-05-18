/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#BFD7ED', // Lighter pastel blue
          DEFAULT: '#91C3E5', // Primary pastel blue
          dark: '#6BAADB',   // Slightly darker pastel blue
        },
        secondary: {
          light: '#FFD8CC', // Light pastel peach
          DEFAULT: '#FFC2AE', // Pastel peach
          dark: '#FFAB90',  // Darker peach
        },
        accent: {
          light: '#E4F1EE', // Light mint
          DEFAULT: '#C9E4DE', // Mint
          dark: '#A5C8BF',  // Dark mint
        }
      },
      fontFamily: {
        // More elegant/romantic options
        'display': ['Playfair Display', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'serif': ['Cormorant Garamond', 'serif'],
        'modern': ['Montserrat', 'sans-serif'],
        'elegant': ['Lora', 'serif'],
        'classic': ['Libre Baskerville', 'serif'],
        'sans': ['Quicksand', 'sans-serif'],
      },
      backgroundColor: {
        dark: {
          primary: '#1F2937', // Dark mode background
          secondary: '#111827', // Darker background
          card: '#374151', // Card background in dark mode
        }
      },
      textColor: {
        dark: {
          primary: '#F3F4F6', // Main text in dark mode
          secondary: '#D1D5DB', // Secondary text in dark mode
          muted: '#9CA3AF', // Muted text in dark mode
        }
      }
    },
  },
  plugins: [],
}