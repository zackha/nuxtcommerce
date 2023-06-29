import pkg from './package.json';

export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/apollo', 'nuxt-icon'],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  colorMode: {
    classSuffix: '',
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GQL_HOST,
      },
    },
  },

  devtools: true,

  routeRules: {
    '/': { ssr: false },
  },
});
