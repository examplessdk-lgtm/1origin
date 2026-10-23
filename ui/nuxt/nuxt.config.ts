export default defineNuxtConfig({
  compatibilityDate: '2026-10-23',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: { colors: { primary: 'sky', neutral: 'slate' } },
  colorMode: { preference: 'dark', fallback: 'dark' },
  app: {
    head: {
      title: 'Origin — workspace UI',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0e0e0e' },
        { name: 'description', content: 'Origin UI-first interactive preview. Backend changes are paused.' }
      ]
    }
  }
})
