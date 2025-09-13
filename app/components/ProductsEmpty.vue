<script setup>
const route = useRoute();
const router = useRouter();

const resetSearch = () => {
  router.push({ query: { ...route.query, q: undefined } });
};
</script>

<template>
  <div
    class="w-full p-5 text-center min-h-[calc(100vh-204px)] items-center flex flex-col justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black rounded-xl">
    <div class="w-28 h-28 bg-neutral-950/70 rounded-full border-neutral-800 border items-center justify-center flex shadow-lg">
      <UIcon name="i-iconamoon-search-bold" class="w-16 h-16 text-white dark:text-neutral-600" />
    </div>
    <div v-if="route.query.category && route.query.q" class="font-extrabold text-3xl my-6 text-center">
      {{ $t('search.no_products_matching') }}
      <strong class="text-alizarin-crimson-700">"{{ route.query.q }}"</strong>
      -
      <strong class="text-alizarin-crimson-700">{{ route.query.category }}</strong>
    </div>
    <div v-else-if="route.query.q" class="font-extrabold text-3xl my-6">
      {{ $t('search.no_products_found_matching') }}
      <strong class="text-alizarin-crimson-700">"{{ route.query.q }}"</strong>
    </div>
    <div v-else class="font-extrabold text-3xl my-6">{{ $t('search.no_products_found') }}</div>
    <div class="text-center mb-5 max-w-md">
      {{ $t('search.use_search_bar_above') }}
    </div>
    <button @click="resetSearch" class="px-4 py-2 bg-black/40 hover:bg-black/60 dark:bg-white/10 hover:dark:bg-white/20 text-white rounded-full active:scale-95 transition">
      {{ $t('search.reset_search') }}
    </button>
  </div>
</template>
