// nuxt.config.ts
import pkg from './package.json';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-graphql-request', '@vueuse/nuxt', '@nuxt/ui', '@nuxt/image', 'notivue/nuxt', '@nuxthub/core'],
  hub: {
    cache: true,
  },
  routeRules: {
    '/': {
      cache: {
        maxAge: 60,
      },
    },
    '/categories': {
      cache: {
        maxAge: 60 * 60,
      },
    },
    '/product/**': {
      cache: {
        maxAge: 60 * 5,
      },
    },
  },
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
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  compatibilityDate: '2024-08-03',
});
