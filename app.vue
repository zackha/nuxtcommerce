<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1 text-right">
        <div class="float-left flex">
          <input type="text" v-model="searchTerm" placeholder="Search" class="pl-1">
          <div v-if="loading" class="ml-1">loading...</div>
        </div>
        <select>
          <option v-for="(size, i) in sizes" :key="i" :value="size.name">{{ size.name }}</option>
        </select>
        <select>
          <option v-for="(color, i) in colors" :key="i" :value="color.name">{{ color.name }}</option>
        </select>
        <select v-model="colorMode.preference">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div class="grid gap-1 grid-cols-3 grid-rows-3">
        <div v-for="node in allProducts" :key="node.id" class="bg-neutral-200 dark:bg-neutral-800">
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
        <button v-if="hasNextPage && !loading" @click="loadMore">Load More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const colors = ref([])
const sizes = ref([])
const searchTerm = ref('')
const allProducts = ref([])
const delayTimer = ref(null)
const loading = ref(false)
const endCursor = ref(null)
const hasNextPage = ref(false)

//get all colors
const { allPaRenk } = await GqlGetAllPaRenk()
colors.value = allPaRenk.nodes.filter(color => color.products.nodes.length)

while (allPaRenk?.pageInfo?.hasNextPage) {
  const response = await GqlGetAllPaRenk({
    after: allPaRenk.pageInfo.endCursor,
  })
  const filteredColors = response.allPaRenk.nodes.filter(color => color.products.nodes.length)
  colors.value = colors.value.concat(filteredColors)
  allPaRenk.pageInfo = response.allPaRenk.pageInfo
}

//get all sizes
const { allPaBeden } = await GqlGetAllPaBeden()
sizes.value = allPaBeden.nodes.filter(size => size.products.nodes.length)

while (allPaBeden?.pageInfo?.hasNextPage) {
  const response = await GqlGetAllPaBeden({
    after: allPaBeden.pageInfo.endCursor,
  })
  const filteredSizes = response.allPaBeden.nodes.filter(size => size.products.nodes.length)
  sizes.value = sizes.value.concat(filteredSizes)
  allPaBeden.pageInfo = response.allPaBeden.pageInfo
}

//get all products
const fetchProducts = async (after, search) => {
  loading.value = true;
  try {
  const { products } = await GqlGetProducts({
    after: after,
    search: search
  })
  allProducts.value = [...allProducts.value, ...products.nodes];
  endCursor.value = products.pageInfo.endCursor;
  hasNextPage.value = products.pageInfo.hasNextPage;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false
  }
}

fetchProducts(null, '')

const loadMore = async () => {
  await fetchProducts(endCursor.value, searchTerm.value)
}

watch(searchTerm, async (newTerm) => {
  clearTimeout(delayTimer.value);
  delayTimer.value = setTimeout(async () => {
    allProducts.value = []
    fetchProducts(null, newTerm)
  }, 500);
})
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
</style>
