export default defineNuxtConfig({
  modules: [
    'nuxt-graphql-client',
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/apollo'
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GQL_HOST
      }
    }
  }
})
