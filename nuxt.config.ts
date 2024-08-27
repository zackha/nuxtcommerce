import pkg from './package.json';

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['nuxt-graphql-request', '@vueuse/nuxt', '@nuxt/ui', '@nuxt/image', 'notivue/nuxt'],

  future: { compatibilityVersion: 4 },

  notivue: {
    position: 'top-center',
    limit: 3,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  },

  css: ['notivue/notification.css', 'notivue/animations.css'],

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
