<script setup lang="ts">
const { siteName } = useAppConfig();

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: siteName,
  meta: [
    { name: 'description', content: 'NuxtCommerce is a dynamic e-commerce solution developed with Nuxt 3 and GraphQL, tailored for WooCommerce.' },
    { property: 'og:image', content: 'https://commerce.nuxt.dev/social-card.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@zhatlen' },
    { name: 'twitter:creator', content: '@zhatlen' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' },
  ],
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
