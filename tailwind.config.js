/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      colors: {
        paper: 'var(--paper)',
        stone: 'var(--stone)',
        surface: 'var(--surface)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: 'var(--ink-muted)'
        },
        brand: {
          DEFAULT: 'var(--brand)',
          hover: 'var(--brand-hover)',
          tint: 'var(--brand-tint)'
        },
        night: {
          DEFAULT: 'var(--night)',
          2: 'var(--night-2)'
        },
        gold: {
          DEFAULT: 'var(--gold)',
          hover: 'var(--gold-hover)'
        },
        legal: {
          bg: 'var(--amber-bg)',
          text: 'var(--amber-text)',
          line: 'var(--amber-line)'
        }
      }
    }
  },
  plugins: []
}
