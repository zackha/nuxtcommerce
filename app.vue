<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1 text-right">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search"
          class="float-left pl-1"
        >
        <select v-model="selectedOption">
          <option value="newest">Latest</option>
          <option value="priceDesc">Price : High to low</option>
          <option value="priceAsc">Price : Low to high</option>
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
import getProducts from "~/gql/queries/getProducts.gql"
const router = useRouter()
const route = useRoute()
const searchTerm = ref(route.query.search || '')
const sortByOrder = ref(route.query.orderby && route.query.orderby !== '' ? route.query.orderby : 'DESC')
const sortByField = ref(route.query.fieldby && route.query.fieldby !== '' ? route.query.fieldby : 'DATE')
const variables = ref({
  search: searchTerm,
  order: sortByOrder,
  field: sortByField
})

const { result, loading, fetchMore } = useQuery(getProducts, variables.value)
const allProducts = computed(() => result.value?.products.nodes)
const pageInfo = computed(() => result.value?.products.pageInfo)

const selectedOption = ref(
  sortByOrder.value === 'DESC' && sortByField.value === 'DATE' 
  ? 'newest' : sortByOrder.value === 'DESC' 
  ? 'priceDesc' 
  : 'priceAsc'
)

const loadMore = () => {
  fetchMore({
    variables: {
      after: pageInfo.value?.endCursor
    },
    updateQuery(prev, {fetchMoreResult}) {
      const mergedData = {
        ...prev
      }
      mergedData.products = {
        ...prev.products,
        nodes: [...prev.products.nodes, ...fetchMoreResult.products.nodes]
      }
      mergedData.products.pageInfo = fetchMoreResult.products.pageInfo
      return mergedData
    }
  })
}

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const loadMorePosition = document.documentElement.scrollHeight - 400

  if (scrollPosition >= loadMorePosition && pageInfo.value?.hasNextPage && !loading.value) {
    loadMore()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch([selectedOption, searchTerm], ([newSelectedOption, newSearchTerm]) => {
  switch (newSelectedOption) {
    case 'newest':
      sortByOrder.value = 'DESC'
      sortByField.value = 'DATE'
      break
    case 'priceDesc':
      sortByOrder.value = 'DESC'
      sortByField.value = 'PRICE'
      break
    case 'priceAsc':
      sortByOrder.value = 'ASC'
      sortByField.value = 'PRICE'
      break
  }
  router.push({
    query: {
      ...route.query,
      search: newSearchTerm || undefined,
      orderby: sortByOrder.value || undefined,
      fieldby: sortByField.value || undefined
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
