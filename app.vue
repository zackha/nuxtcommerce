<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search"
          class="pl-1"
        >
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
const searchTerm = ref('')
const variables = ref({
  search: searchTerm
})
searchTerm.value = route.query.search
const { result, loading, fetchMore } = useQuery(getProducts, variables.value)
const allProducts = computed(() => result.value?.products.nodes)
const pageInfo = computed(() => result.value?.products.pageInfo)

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

watch(searchTerm, (newTerm) => {
  router.push({ 
    query: {
      ...route.query,
      search: newTerm || undefined
    } 
  });
})
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
</style>
