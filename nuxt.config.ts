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

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },

  devtools: true,
});
