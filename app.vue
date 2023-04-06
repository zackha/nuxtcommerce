<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1 text-right">
        <select v-model="colorMode.preference">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div class="grid gap-1 grid-cols-3 grid-rows-3">
        <div v-for="(node, i) in allProducts" :key="i" :index="i">
          <NuxtImg :src="node?.image?.sourceUrl" format="webp" />
        </div>
        <div v-if="loading">loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const allProducts = ref([])
const endCursor = ref(null)
const loading = ref(false)
const loadMoreObserver = ref(null)

async function fetchProducts() {
  loading.value = true
  const { products } = await GqlGetProducts({
    after: endCursor.value,
  })
  allProducts.value = [...allProducts.value, ...products.nodes]
  endCursor.value = products.pageInfo.endCursor
  loading.value = false
}

async function loadMore() {
  if (!endCursor.value || loading.value) {
    return
  }
  await fetchProducts()
}

onMounted(() => {
  fetchProducts()

  const observerOptions = {
    root: null,
    rootMargin: '450px',
    threshold: .2,
  }

  loadMoreObserver.value = new IntersectionObserver(async (entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      await loadMore()
    }
  }, observerOptions)

  const sentinel = document.createElement('div')
  document.body.appendChild(sentinel)
  loadMoreObserver.value.observe(sentinel)
})

onBeforeUnmount(() => {
  if (loadMoreObserver.value) {
    loadMoreObserver.value.disconnect()
  }
})
</script>

<style lang="postcss">
.dark-mode body {
  @apply bg-black text-neutral-100;
}
</style>
