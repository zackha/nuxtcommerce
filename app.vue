<template>
  <div class="flex">
    <div class="mx-auto box-content w-[calc(100%+40px)] max-w-[935px] grow p-1">
      <div role="tablist" class="my-4 flex max-w-full flex-col items-stretch">
        <div class="flex flex-row flex-nowrap items-center gap-4">
          <HeaderLogo />
          <div class="flex flex-shrink flex-grow flex-col text-sm font-semibold text-neutral-600 dark:text-neutral-200">
            <form
              class="group flex h-10 flex-grow rounded-xl border border-transparent bg-neutral-800/5 dark:bg-white/10 pl-4 pr-3 transition-all focus-within:border-neutral-400 focus-within:dark:border-neutral-600 focus-within:bg-white/30 focus-within:dark:bg-neutral-800/30 hover:border-neutral-300 hover:focus-within:border-neutral-400 hover:dark:border-neutral-600">
              <div class="flex w-full items-center gap-4">
                <div class="flex text-neutral-500 dark:text-neutral-400">
                  <Icon name="majesticons:search-line" size="20"></Icon>
                </div>
                <div class="flex w-full">
                  <input
                    class="w-full bg-transparent py-2 outline-none placeholder:text-neutral-400 placeholder:dark:text-neutral-500"
                    v-model="searchTerm"
                    :placeholder="selectedCategory ? `Search in ${selectedCategory}` : 'Search'" />
                </div>
                <div @click="searchTerm = ''" class="opacity-0 flex cursor-pointer text-neutral-300 dark:text-neutral-500 transition-all group-focus-within:opacity-100">
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
            class="relative cursor-pointer select-none items-center justify-center text-sm font-semibold">
            <div
              class="box-border flex h-10 items-center rounded-xl py-1.5 pl-4 pr-3 transition-all bg-neutral-800/5 hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
              <span class="mr-3">{{ selectedCategory || 'All Categories' }}</span>
              <Icon name="ion:chevron-down-outline" size="14" />
            </div>
            <Transition>
              <div
                v-if="isDropdownCategory"
                class="absolute left-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
                <div class="m-2 w-44">
                  <div @click="selectedCategory = ''" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
                    <div class="flex items-center justify-between">
                      <div class="mr-4 w-full">All Categories</div>
                      <Icon v-if="selectedCategory === ''" name="mingcute:check-line" size="16" />
                    </div>
                  </div>
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    @click="selectedCategory = category.name"
                    class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
                    <div class="flex items-center justify-between">
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
            class="relative cursor-pointer select-none items-center justify-center text-sm font-semibold">
            <div
              class="box-border flex h-10 items-center rounded-xl py-1.5 pl-4 pr-3 transition-all bg-neutral-800/5 hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
              <span class="mr-3">{{ selectedOption }}</span>
              <Icon name="ion:chevron-down-outline" size="14" />
            </div>
            <Transition>
              <div
                v-if="isDropdownSortBy"
                class="absolute right-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
                <div class="m-2 w-44">
                  <div
                    v-for="(option, index) in options"
                    :key="index"
                    @click="selectedOption = option.value"
                    class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
                    <div class="flex items-center justify-between">
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
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="node in products"
          :key="node.id"
          class="group cursor-pointer rounded-2xl dark:bg-secondary-bg-d hover:dark:bg-[#222222] px-4 pt-4 pb-3 transition ease-[ease] duration-300 dark:border-[#222222] hover:dark:border-[#303030] border">
          <div class="relative mb-4 pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-lg overflow-hidden">
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.galleryImages.nodes[0].sourceUrl"
              class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover" />
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.image.sourceUrl"
              class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0" />
          </div>
          <div class="mb-1 grid grid-flow-col gap-6 px-2 text-sm font-semibold">
            <div class="flex min-w-0 flex-col justify-between gap-1">
              <div class="text-xs text-secondary-text dark:text-secondary-text-d transition-all hover:text-black hover:dark:text-neutral-100">
                {{ node.allPaUrunTipi.nodes[0].name }}
              </div>
              <div :title="node.name" class="overflow-hidden text-ellipsis whitespace-nowrap">
                {{ node.name }}
              </div>
            </div>
            <div class="flex flex-col gap-1 text-right">
              <div class="text-xs text-secondary-text dark:text-secondary-text-d line-through" v-html="node.regularPrice"></div>
              <div class="font-bold text-[#d9000c] dark:text-[#ff0000]" v-html="node.salePrice"></div>
            </div>
          </div>
        </div>
        <ProductSkeleton v-if="loading" />
      </div>
      <div v-if="!empty && !loading" class="p-6 text-center text-lg">
        <Icon name="majesticons:search-line" size="99"></Icon>
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
      <Footer />
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
.dark {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
.v-enter-active {
  @apply transition duration-200 ease-out;
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
  @apply transition duration-150 ease-in;
}
</style>
