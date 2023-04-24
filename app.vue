<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-4 text-right">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search"
          class="float-left pl-1"
        >
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <template v-for="category in categories" :key="category.id">
            <option :value="category.name">
              {{ category.name }}
            </option>
            <template v-for="cat in category.children.nodes.filter(cat => cat.products.nodes.length)" :key="cat.id">
              <option :value="cat.name">
                — {{ cat.name }}
              </option>
              <option v-for="c in cat.children.nodes.filter(c => c.products.nodes.length)" :key="c.id" :value="c.name">
                —— {{ c.name }}
              </option>
            </template>
          </template>
        </select>
        <select v-model="selectedOption">
          <option value="newest">Newest</option>
          <option value="priceDesc">Price : High to low</option>
          <option value="priceAsc">Price : Low to high</option>
        </select>
      </div>
      <div role="tablist" class="border-t dark:border-neutral-800 box-border justify-end flex gap-[60px] relative">
        <div @click.stop="isDropdownCategory = !isDropdownCategory; isDropdownSortBy = false;" :class="{activeTab: isDropdownCategory}" class="items-center dark:text-[#a8a8a8] text-xs flex h-[52px] justify-center cursor-pointer">
          <div class="flex box-border items-center">
            <Icon name="system-uicons:grid-squares" size="21" />
            <span class="ml-1.5 font-semibold uppercase tracking-wider select-none">Category</span>
          </div>
          <Transition>
            <div v-show="isDropdownCategory" class="absolute top-full z-10 right-[55px] dropdown">
              <div class="dropdown-triangle left-[30%]"></div>
              <div class="text-sm bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden">
                <div class="border-b dark:border-[#353535] last:border-b-0" @click="selectedCategory = ''">
                  <a class="dark:text-neutral-100 block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">All Categories</a>
                </div>
                <div class="border-b dark:border-[#353535] last:border-b-0" v-for="category in categories" :key="category.id" @click="selectedCategory = category.name">
                  <a class="dark:text-neutral-100 block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">{{ category.name }}</a>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div @click.stop="isDropdownSortBy = !isDropdownSortBy; isDropdownCategory = false;" :class="{activeTab: isDropdownSortBy}" class="items-center dark:text-[#a8a8a8] text-xs flex h-[52px] justify-center cursor-pointer">
          <div class="flex box-border items-center">
            <Icon name="system-uicons:filter" size="21" />
            <span class="ml-1.5 font-semibold uppercase tracking-wider select-none">Sort by</span>
          </div>
          <Transition>
            <div v-show="isDropdownSortBy" class="absolute top-full z-10 -right-[18px] dropdown">
              <div class="dropdown-triangle left-[57%]"></div>
              <div class="text-sm bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden">
                <div class="border-b dark:border-[#353535] last:border-b-0" v-for="(option, index) in options" :key="index" @click="selectedOption = option.value">
                  <a class="dark:text-neutral-100 block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">{{ option.label }}</a>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="grid gap-1 grid-cols-3">
        <div v-for="node in products" :key="node.id" class="bg-neutral-200 dark:bg-neutral-800">
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
import getCategories from "~/gql/queries/getCategories.gql"
const isDropdownSortBy = ref(false)
const isDropdownCategory = ref(false)
const router = useRouter()
const route = useRoute()
const searchTerm = ref(route.query.search || null)
const selectedCategory = ref(route.query.category || '')
const sortByOrder = ref(route.query.orderby && route.query.orderby !== '' ? route.query.orderby : 'DESC')
const sortByField = ref(route.query.fieldby && route.query.fieldby !== '' ? route.query.fieldby : 'DATE')
const variables = ref({
  search: searchTerm,
  category: selectedCategory,
  order: sortByOrder,
  field: sortByField
})

const { result: categoriesResult } = useQuery(getCategories)
const { result: productsResult, loading, fetchMore } = useQuery(getProducts, variables.value)
const products = computed(() => productsResult.value?.products.nodes)
const pageInfo = computed(() => productsResult.value?.products.pageInfo)
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter(
  categories => categories.products.nodes.length && categories.children.nodes.length
))

const options = reactive([
  { label: "Newest", value: "newest" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Price: Low to High", value: "priceAsc" }
]);

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

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    isDropdownSortBy.value = false;
    isDropdownCategory.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})

watch([selectedOption, searchTerm, selectedCategory], ([newSelectedOption, newSearchTerm, newCategory]) => {
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
      category: newCategory || undefined,
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
.dropdown {
  filter: drop-shadow(0 4px 12px rgba(0,0,0,.15));
}
.dropdown-triangle {
  @apply absolute dark:bg-neutral-800 h-5 w-4 -top-[10px] rotate-90;
  clip-path: path('M8 0C8 4 9.32406e-08 7.819 1.25211e-07 10.5C1.57188e-07 13.1815 8 17.0005 8 21L8 0Z');
}
.v-enter-active {
  @apply transition ease-out duration-100
}
.v-enter-from,
.v-leave-to {
  @apply transform opacity-0 scale-95;
}

.v-enter-to,
.v-leave-from {
  @apply transform opacity-100 scale-100;
}

.v-leave-active {
  @apply transition ease-in duration-75
}
.activeTab {
  @apply text-neutral-100;
  box-shadow: 0 -1px 0 #fff;
}
</style>
