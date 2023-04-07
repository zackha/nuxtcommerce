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
        <div v-for="node in allProducts" :key="node.id">
          <div class="relative pb-[133%] overflow-hidden">
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.image.sourceUrl"
              class="object-cover w-full h-full absolute"
            />
          </div>
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

async function fetchProducts() {
  loading.value = true
  const { products } = await GqlGetProducts({
    after: endCursor.value,
  })
  allProducts.value = [...allProducts.value, ...products.nodes]
  endCursor.value = products.pageInfo.endCursor
  loading.value = false
}


onMounted(() => {
  fetchProducts()

  window.addEventListener('scroll', () => {
    const threshold = 412
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold &&
      !loading.value
    ) {
      fetchProducts()
    }
  })
})
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
</style>
