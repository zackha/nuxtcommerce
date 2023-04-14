<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1 text-right">
        <input type="text" v-model="searchTerm" placeholder="Search" class="float-left pl-1">
        <select>
          <option v-for="(size, i) in sizes" :key="i" :value="size.name">{{ size.name }}</option>
        </select>
        <select>
          <option v-for="(color, i) in colors" :key="i" :value="color.name">{{ color.name }}</option>
        </select>
      </div>
      <div class="grid gap-1 grid-cols-3">
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
        <div v-if="loading" v-for="node in 9" :key="node" class="animate-pulse bg-neutral-200 dark:bg-neutral-800">
          <div class="relative pb-[133%] overflow-hidden"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
async function fetchProducts(after, search) {
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

fetchProducts(endCursor.value, searchTerm.value)

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (scrollTop + windowHeight >= documentHeight - 300 && !loading.value && hasNextPage.value) {
    fetchProducts(endCursor.value, searchTerm.value)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(searchTerm, async (newTerm) => {
  clearTimeout(delayTimer.value);
  delayTimer.value = setTimeout(async () => {
    allProducts.value = []
    fetchProducts(null, newTerm)
  }, 700);
})
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
</style>
