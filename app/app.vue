<!--app/app.vue-->
<script setup lang="ts">
const { siteName, siteDescription } = useAppConfig();

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - ${siteName}` : siteName),
});

useSeoMeta({
  description: siteDescription,
  ogType: 'website',
  ogImage: 'https://commerce.nuxt.dev/social-card.jpg',
  ogSiteName: siteName,
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@zhatlen',
  twitterCreator: '@zhatlen',
  twitterImage: 'https://commerce.nuxt.dev/social-card.jpg',
  keywords: `${siteName}, ecommerce, nuxt, woocommerce`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
});
</script>

<template>
  <AppHeader />
  <div class="pt-[72px] lg:pt-20 min-h-[calc(100vh-72px)]">
    <NuxtPage />
  </div>
  <AppFooter />
  <Notivue v-slot="item">
    <Notification :item="item" :theme="materialTheme" />
  </Notivue>
</template>

<style lang="postcss">
.dark {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
.dropdown-enter-active {
  @apply transition duration-200 ease-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  @apply translate-y-5 opacity-0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  @apply transform opacity-100;
}
.dropdown-leave-active {
  @apply transition duration-150 ease-in;
}
</style>
