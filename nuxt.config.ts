export default defineNuxtConfig({
  modules: [
    'nuxt-graphql-client',
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  image: {
    domains: process.env.IMAGE_DOMAIN ? process.env.IMAGE_DOMAIN.replace(/ /g, '').split(',') : [],
  }
})
