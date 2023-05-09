<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <Header />
      <div role="tablist" class="mb-4 flex items-stretch flex-col max-w-full">
        <div class="flex-row flex-nowrap flex items-center gap-4">
          <div class="flex-grow flex-shrink flex flex-col text-neutral-300 font-medium">
            <form
              class="flex-grow flex bg-white/10 h-10 transition-all pl-4 pr-3 rounded-xl border border-transparent hover:border-neutral-600 focus-within:border-neutral-600 focus-within:bg-neutral-800/30 group">
              <div class="flex items-center gap-4 w-full">
                <div class="flex text-neutral-500">
                  <Icon name="majesticons:search-line" size="22"></Icon>
                </div>
                <div class="flex w-full">
                  <input
                    class="placeholder:text-neutral-500 bg-transparent outline-none w-full py-2"
                    v-model="searchTerm"
                    :placeholder="selectedCategory ? `Search in ${selectedCategory}` : 'Search'" />
                </div>
                <div @click="searchTerm = ''" class="flex transition-all cursor-pointer text-neutral-500 group-focus-within:visible invisible">
                  <Icon v-if="!loading" name="solar:close-square-bold" size="24" />
                  <Icon v-else-if="loading" name="Loading" size="20" />
                </div>
              </div>
            </form>
          </div>
          <div
            @click.stop="
              isDropdownCategory = !isDropdownCategory;
              isDropdownSortBy = false;
            "
            class="items-center text-sm justify-center cursor-pointer select-none font-semibold relative">
            <div class="flex box-border items-center active:scale-95 bg-white/10 hover:bg-white/20 h-10 transition-all py-1.5 pr-3 pl-4 rounded-xl">
              <span class="mr-3">{{ selectedCategory || 'All Categories' }}</span>
              <Icon name="ion:chevron-down-outline" size="14" />
            </div>
            <Transition>
              <div
                v-if="isDropdownCategory"
                class="absolute top-full z-10 text-[13px] font-medium rounded-xl dark:bg-neutral-800/80 border border-white/10 backdrop-blur-xl left-0 mt-3">
                <div class="w-44 m-2">
                  <div @click="selectedCategory = ''" class="py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <div class="flex justify-between items-center">
                      <div class="mr-4 w-full">All Categories</div>
                      <Icon v-if="selectedCategory === ''" name="mingcute:check-line" size="16" />
                    </div>
                  </div>
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    @click="selectedCategory = category.name"
                    class="py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <div class="flex justify-between items-center">
                      <div class="mr-4 w-full">{{ category.name }}</div>
                      <Icon v-if="selectedCategory === category.name" name="mingcute:check-line" size="16" />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div
            @click.stop="
              isDropdownSortBy = !isDropdownSortBy;
              isDropdownCategory = false;
            "
            class="items-center text-sm justify-center cursor-pointer select-none font-semibold relative">
            <div class="flex box-border items-center active:scale-95 bg-white/10 hover:bg-white/20 h-10 transition-all py-1.5 pr-3 pl-4 rounded-xl">
              <span class="mr-3">{{ selectedOption }}</span>
              <Icon name="ion:chevron-down-outline" size="14" />
            </div>
            <Transition>
              <div
                v-if="isDropdownSortBy"
                class="absolute top-full z-10 text-[13px] font-medium rounded-xl dark:bg-neutral-800/80 border border-white/10 backdrop-blur-xl right-0 mt-3">
                <div class="w-44 m-2">
                  <div
                    v-for="(option, index) in options"
                    :key="index"
                    @click="selectedOption = option.value"
                    class="py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <div class="flex justify-between items-center">
                      <div class="mr-4 w-full">{{ option.value }}</div>
                      <Icon v-if="selectedOption === option.value" name="mingcute:check-line" size="16" />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="grid gap-4 grid-cols-3">
        <div
          v-for="node in products"
          :key="node.id"
          class="p-2 border border-neutral-700 rounded-2xl group cursor-pointer transition-all hover:bg-neutral-800/40 hover:border-neutral-600">
          <div class="relative pb-[133%] mb-3">
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.galleryImages.nodes[0].sourceUrl"
              class="object-cover w-full h-full absolute rounded-lg bg-neutral-800" />
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.image.sourceUrl"
              class="object-cover w-full h-full absolute rounded-lg bg-neutral-800 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
          <div class="px-2 mb-1 text-sm font-semibold gap-6 grid-flow-col grid">
            <div class="flex flex-col min-w-0 justify-between gap-1">
              <div class="text-neutral-400 text-xs">
                {{ node.allPaUrunTipi.nodes[0].name }}
              </div>
              <div :title="node.name" class="text-ellipsis whitespace-nowrap overflow-hidden">
                {{ node.name }}
              </div>
            </div>
            <div class="text-right gap-1 flex flex-col">
              <div class="line-through text-neutral-400 text-xs" v-html="node.regularPrice"></div>
              <div class="text-[#ff0000] font-bold" v-html="node.salePrice"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!empty && !loading" class="text-lg text-center p-6">
        <Icon name="heroicons-outline:magnifying-glass" size="99"></Icon>
        <div class="py-4">
          <span v-if="selectedCategory">
            In the <strong>{{ selectedCategory }}</strong> category,
          </span>
          <span v-if="searchTerm">
            there are no items matching for: <strong>{{ searchTerm }}</strong>
          </span>
        </div>
        <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getProducts from '~/gql/queries/getProducts.gql';
import getCategories from '~/gql/queries/getCategories.gql';
const isDropdownSortBy = ref(false);
const isDropdownCategory = ref(false);
const router = useRouter();
const route = useRoute();
const searchTerm = ref(route.query.search || '');
const selectedCategory = ref(route.query.category || '');
const sortByOrder = ref(route.query.orderby && route.query.orderby !== '' ? route.query.orderby : 'DESC');
const sortByField = ref(route.query.fieldby && route.query.fieldby !== '' ? route.query.fieldby : 'DATE');
const variables = ref({
  search: searchTerm,
  category: selectedCategory,
  order: sortByOrder,
  field: sortByField,
});

const { result: categoriesResult } = useQuery(getCategories);
const { result: productsResult, loading, fetchMore } = useQuery(getProducts, variables.value);
const products = computed(() => productsResult.value?.products.nodes);
const empty = computed(() => productsResult.value?.products.nodes.length);
const pageInfo = computed(() => productsResult.value?.products.pageInfo);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((categories) => categories.products.nodes.length && categories.children.nodes.length));

const options = reactive([{ value: 'Newest' }, { value: 'Price: High to Low' }, { value: 'Price: Low to High' }]);

const selectedOption = ref(sortByOrder.value === 'DESC' && sortByField.value === 'DATE' ? 'Newest' : sortByOrder.value === 'DESC' ? 'Price: High to Low' : 'Price: Low to High');

const loadMore = () => {
  fetchMore({
    variables: {
      after: pageInfo.value?.endCursor,
    },
    updateQuery(prev, { fetchMoreResult }) {
      const mergedData = {
        ...prev,
      };
      mergedData.products = {
        ...prev.products,
        nodes: [...prev.products.nodes, ...fetchMoreResult.products.nodes],
      };
      mergedData.products.pageInfo = fetchMoreResult.products.pageInfo;
      return mergedData;
    },
  });
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const loadMorePosition = document.documentElement.scrollHeight - 1600;

  if (scrollPosition >= loadMorePosition && pageInfo.value?.hasNextPage && !loading.value) {
    loadMore();
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown')) {
    isDropdownSortBy.value = false;
    isDropdownCategory.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});

watch([selectedOption, searchTerm, selectedCategory], ([newSelectedOption, newSearchTerm, newCategory]) => {
  let updatedQuery = {
    ...route.query,
    search: newSearchTerm || undefined,
    category: newCategory || undefined,
  };

  switch (newSelectedOption) {
    case 'Newest':
      sortByOrder.value = 'DESC';
      sortByField.value = 'DATE';
      updatedQuery = {
        ...updatedQuery,
        orderby: undefined,
        fieldby: undefined,
      };
      break;
    case 'Price: High to Low':
      sortByOrder.value = 'DESC';
      sortByField.value = 'PRICE';
      updatedQuery = {
        ...updatedQuery,
        orderby: sortByOrder.value || undefined,
        fieldby: sortByField.value || undefined,
      };
      break;
    case 'Price: Low to High':
      sortByOrder.value = 'ASC';
      sortByField.value = 'PRICE';
      updatedQuery = {
        ...updatedQuery,
        orderby: sortByOrder.value || undefined,
        fieldby: sortByField.value || undefined,
      };
      break;
  }
  router.push({
    query: updatedQuery,
  });
});
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
.v-enter-active {
  @apply transition ease-out duration-200;
}
.v-enter-from,
.v-leave-to {
  @apply translate-y-5 opacity-0;
}
.v-enter-to,
.v-leave-from {
  @apply transform opacity-100;
}
.v-leave-active {
  @apply transition ease-in duration-150;
}
</style>
