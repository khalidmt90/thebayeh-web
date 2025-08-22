import type { Config } from 'tailwindcss'

// Phase 2: Consolidated brand tokens; only approved palette entries exposed.
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1200px',
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        // Core brand
        primary: '#FFD233',        // Gold
        brand: '#FFD233',          // Alias
        black: '#1A1A1A',          // Brand black (text/ink)
        text: '#1A1A1A',           // Primary text
        textMuted: '#555555',
        background: '#FFFFFF',
        backgroundAlt: '#F8F8F8',
        border: '#E5E5E5',
        white: '#FFFFFF',
        // Semantic surface states derived (kept minimal)
        focus: '#FFD233',
        ring: '#FFD233'
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.75rem'
      },
      borderColor: { DEFAULT: '#E5E5E5' },
      boxShadow: {
        'focus-brand': '0 0 0 2px #FFFFFF, 0 0 0 4px #FFD233',
        'sm-soft': '0 1px 2px 0 rgba(0,0,0,0.06), 0 1px 3px 1px rgba(0,0,0,0.04)',
        'md-soft': '0 2px 4px -1px rgba(0,0,0,0.08), 0 4px 6px -1px rgba(0,0,0,0.05)'
      },
      fontFamily: {
        sans: ['var(--font-arabic)', 'var(--font-latin)', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
