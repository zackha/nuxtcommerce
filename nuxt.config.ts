// nuxt.config.ts
import pkg from './package.json';

export default defineNuxtConfig({
    devtools: {enabled: false},

    modules: [
        'nuxt-graphql-request',
        '@vueuse/nuxt',
        '@nuxt/ui',
        '@nuxt/image',
        'notivue/nuxt',
        '@nuxthub/core',
        '@nuxtjs/i18n',
    ],

    i18n: {
        locales: [
            {code: 'en', iso: 'en-GB', file: 'en-GB.json', name: '🇬🇧 English'},
            {code: 'nb', iso: 'nb-NO',file: 'nb-NO.json', name: '🇳🇴 Norsk (Bokmål)'},
            {code: 'nl', iso: 'nl-NL', file: 'nl-NL.json', name: '🇳🇱 Nederlands'},
            {code: 'de', iso: 'de-DE', file: 'de-DE.json', name: '🇩🇪 Deutsch'},
        ],
        defaultLocale: 'en',
    },

    hub: {
        cache: true,
    },

    notivue: {
        position: 'top-center',
        limit: 3,
        notifications: {global: {duration: 3000}},
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
        '/': {prerender: true},
        '/categories': {swr: 3600}, // sık güncellenmeyen liste
        // Admin / kişisel sayfalar genelde SSR off tercih edilir:
        '/favorites': {swr: 600},
        // /api/** uçları handler düzeyinde cache'leniyor; burada ekstra kural yok
    },

    nitro: {
        prerender: {routes: ['/sitemap.xml', '/robots.txt']},
    },

    compatibilityDate: '2024-08-03',
});