export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/image-edge', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/apollo', 'nuxt-icon'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GQL_HOST,
      },
    },
  },
});
