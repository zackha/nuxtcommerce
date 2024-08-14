import pkg from './package.json';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-graphql-request', '@vueuse/nuxt', '@nuxt/ui', '@nuxt/image'],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  graphql: {
    clients: {
      default: {
        endpoint: process.env.GQL_HOST || '',
      },
    },
  },

  compatibilityDate: '2024-08-03',
});