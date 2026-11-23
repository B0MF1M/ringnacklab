// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'RingnackLab — Criadouros Legalizados e Guias de Ring Neck',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Encontre criadouros parceiros legalizados de Ring Neck (Psittacula krameri) na sua região, com registro à vista, contato direto pelo WhatsApp e os guias oficiais do @ringnacklab.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ringnacklab.com.br/' },
        { property: 'og:title', content: 'RingnackLab — Guias e Criadouros Legalizados de Ring Neck' },
        {
          property: 'og:description',
          content:
            'Pacote com os 3 guias oficiais do Ring Neck e credenciamento nacional de criadouros legalizados com curadoria do @ringnacklab.'
        },
        { property: 'og:image', content: 'https://ringnacklab.com.br/images/hero-ringneck.jpg' },
        { name: 'theme-color', content: '#0F2227' }
      ],
      link: [
        { rel: 'canonical', href: 'https://ringnacklab.com.br/' },
        { rel: 'icon', type: 'image/png', href: '/brand/favicon.png' },
        { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', as: 'image', href: '/images/hero-ringneck.jpg', fetchpriority: 'high' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      instagramHandle: '@ringnacklab',
      instagramUrl: 'https://www.instagram.com/ringnacklab/',
      adminWhatsapp: '5571983477467',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  }
})
