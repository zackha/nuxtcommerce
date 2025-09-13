<!--app/pages/index.vue-->
<script setup>
const route = useRoute();
const { name } = useAppConfig().site;
const url = useRequestURL();
const canonical = computed(() => {
  const base = `${url.origin}${url.pathname}`;
  const params = new URLSearchParams();
  if (typeof route.query.q === 'string' && route.query.q) params.set('q', route.query.q);
  if (typeof route.query.category === 'string' && route.query.category) params.set('category', route.query.category);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
});

useHead(() => {
  const q = typeof route.query.q === 'string' ? route.query.q : undefined;
  const category = typeof route.query.category === 'string' ? route.query.category : undefined;

  let title = '';
  let description = '';
  const keywords = new Set(['ecommerce', name]);

  if (category) {
    title = `${category} Products`;
    description = `Browse ${category} products on ${name}.`;
    keywords.add(category);
  }

  if (q) {
    title = `Search results for "${q}"`;
    description = `Search results for "${q}" on ${name}.`;
    keywords.add(q);
  }

  const canonicalUrl = canonical.value;

  return {
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogUrl: canonicalUrl,
    canonical: canonicalUrl,
    keywords: Array.from(keywords).join(', '),
    twitterTitle: title,
    twitterDescription: description,
    ogImage: 'https://commerce.nuxt.dev/social-card.jpg',
    twitterImage: 'https://commerce.nuxt.dev/social-card.jpg',
  };
});

const productsData = ref([]);
const isLoading = ref(false);
const hasFetched = ref(false);
const tailEl = ref(null);
const pageInfo = ref({ hasNextPage: true, endCursor: null });

const variables = computed(() => ({
  search: route.query.q,
  order: route.query.orderby?.toUpperCase() || 'DESC',
  field: route.query.fieldby?.toUpperCase() || 'DATE',
  category: route.query.category,
  after: pageInfo.value.endCursor,
}));

async function fetch() {
  if (isLoading.value || !pageInfo.value.hasNextPage) return;
  isLoading.value = true;

  try {
    const response = await $fetch('/api/products', {
      query: variables.value,
    });
    productsData.value.push(...response.products.nodes);
    pageInfo.value = response.products.pageInfo;
    hasFetched.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetch);

useIntervalFn(() => {
  if (!tailEl.value || isLoading.value) return;
  const { top } = tailEl.value.getBoundingClientRect();
  if (top - window.innerHeight < 400) {
    fetch();
  }
}, 500);

watch(
  () => route.query,
  () => {
    productsData.value = [];
    pageInfo.value = { hasNextPage: true, endCursor: null };
    fetch();
  }
);

const products = computed(() => productsData.value);
const productsEmpty = computed(() => hasFetched.value && !isLoading.value && productsData.value.length === 0);
</script>

<template>
  <div class="flex items-center pl-3 lg:pl-5">
    <ButtonSortBy />
    <ButtonSelectCategory />
  </div>
  <div v-if="!productsEmpty" class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 lg:gap-5 p-3 lg:p-5">
    <ProductCard :products="products" />
    <ProductsSkeleton v-if="(!products.length || isLoading) && !productsEmpty" />
    <br ref="tailEl" />
  </div>
  <ProductsEmpty v-else />
</template>
