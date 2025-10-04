/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#f97316',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#f97316',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'display-4xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3xl': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-2xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'title-xl': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title-lg': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'title-md': ['1.5rem', { lineHeight: '1.3' }],
        'title-sm': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.5px' }],
      },
      animation: {
        'sunrise': 'sunrise 2s ease-in-out infinite alternate',
        'sunset': 'sunset 2s ease-in-out infinite alternate',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        sunrise: {
          '0%': { transform: 'translateY(20px)', opacity: '0.7' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        sunset: {
          '0%': { transform: 'translateY(0px)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0.7' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.8)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
