// nuxt.config.ts
import pkg from './package.json';

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['nuxt-graphql-request', '@vueuse/nuxt', '@nuxt/ui', '@nuxt/image', 'notivue/nuxt', '@nuxthub/core'],

  notivue: {
    position: 'top-center',
    limit: 3,
    notifications: { global: { duration: 3000 } },
  },

  css: ['notivue/notification.css', 'notivue/animations.css'],

  runtimeConfig: {
    // Sunucu tarafında kullan (client'a sızmaz):
    gqlHost: process.env.GQL_HOST || '',
    public: {
      version: pkg.version,
    },
  },

  // Sayfa bazlı render/cache stratejisi:
  routeRules: {
    '/': { prerender: true },
    '/categories': { swr: 3600 }, // sık güncellenmeyen liste
    // Admin / kişisel sayfalar genelde SSR off tercih edilir:
    '/favorites': { swr: 600 },
    // /api/** uçları handler düzeyinde cache'leniyor; burada ekstra kural yok
  },

  nitro: {
    prerender: { routes: ['/sitemap.xml', '/robots.txt'] },
  },

  compatibilityDate: '2024-08-03',
});
