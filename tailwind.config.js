/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Custom breakpoint for extra small devices
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#91C3E5', // Primary pastel blue
          600: '#6BAADB', // Slightly darker pastel blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          light: '#BFD7ED', // Lighter pastel blue
          DEFAULT: '#91C3E5', // Primary pastel blue
          dark: '#6BAADB',   // Slightly darker pastel blue
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FFC2AE', // Pastel peach
          600: '#FFAB90', // Darker peach
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          light: '#FFD8CC', // Light pastel peach
          DEFAULT: '#FFC2AE', // Pastel peach
          dark: '#FFAB90',  // Darker peach
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#C9E4DE', // Mint
          600: '#A5C8BF', // Dark mint
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
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
      },
      // Custom animations for RSVP component
      keyframes: {
        // RSVP Hero animations
        'rsvp-fade': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        // Loading animations
        'pulse-card': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        // Error animations
        'error-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-3px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(3px)' }
        },
        'error-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1deg)' },
          '75%': { transform: 'rotate(1deg)' }
        },
        // Success animations
        'success-bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' }
        },
        'success-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        // Form and card animations
        'card-entrance': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(20px) scale(0.95)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          }
        },
        'form-entrance': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'icon-bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' }
        },
        'avatar-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'input-slide': {
          'from': { 
            opacity: '0', 
            transform: 'translateX(-20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          }
        },
        'section-slide': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'slide-down': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(-20px)',
            maxHeight: '0'
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)',
            maxHeight: '200px'
          }
        },
        'fade-slide': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(-10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'fade-in-up': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'guest-welcome': {
          'from': { 
            opacity: '0', 
            transform: 'scale(0.9)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'scale(1)' 
          }
        },
        'button-glow': {
          '0%, 100%': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
          '50%': { boxShadow: '0 10px 15px -3px rgba(145, 195, 229, 0.4)' }
        },
        'button-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' }
        },
        'button-entrance': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        // RSVP Hero animations
        'rsvp-fade': 'rsvp-fade 0.8s ease-out 0.2s forwards',
        'rsvp-fade-delayed': 'rsvp-fade 0.8s ease-out 0.6s forwards',
        'rsvp-fade-delayed-2': 'rsvp-fade 0.8s ease-out 1s forwards',
        
        // Loading animations
        'pulse-card': 'pulse-card 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 2s linear infinite',
        
        // Error animations
        'error-shake': 'error-shake 0.5s ease-in-out',
        'error-wiggle': 'error-wiggle 0.3s ease-in-out 3',
        
        // Success animations
        'success-bounce': 'success-bounce 1s ease-out',
        'success-pulse': 'success-pulse 2s ease-in-out infinite',
        
        // Form and card animations
        'card-entrance': 'card-entrance 0.6s ease-out',
        'form-entrance': 'form-entrance 0.8s ease-out 0.2s forwards',
        'icon-bounce': 'icon-bounce 1s ease-out',
        'avatar-bounce': 'avatar-bounce 2s ease-in-out infinite',
        'input-slide': 'input-slide 0.5s ease-out',
        'section-slide': 'section-slide 0.6s ease-out 0.1s forwards',
        'section-slide-delayed': 'section-slide 0.6s ease-out 0.3s forwards',
        'section-slide-delayed-2': 'section-slide 0.6s ease-out 0.5s forwards',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-slide': 'fade-slide 0.4s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out 1.2s forwards',
        'guest-welcome': 'guest-welcome 0.8s ease-out 0.2s forwards',
        'button-glow': 'button-glow 3s ease-in-out infinite',
        'button-pulse': 'button-pulse 2s ease-in-out infinite',
        'button-entrance': 'button-entrance 0.8s ease-out 0.7s forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}