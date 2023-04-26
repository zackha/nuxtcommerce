<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-11 pt-7 flex justify-center">
        <div class="my-0 mx-auto">
          <span class="flex items-center justify-center">
            <NuxtImg class="my-0 mx-auto h-14" src="https://seeklogo.com/images/S/supreme-ny-logo-AAF66BE276-seeklogo.com.png" />
          </span>
          <div class="mt-4 font-mono">
            <div class="text-sm text-center m-auto">{{ formattedDate }}</div>
          </div>
        </div>
      </div>
      <div role="tablist" class="border-t dark:border-neutral-800 box-border items-center grid grid-cols-3 gap-1 relative">
        <div class="flex flex-row text-center dark:text-[#a8a8a8]">
          <label class="group w-full block relative py-1 focus-within:border-[#353535] border border-transparent rounded-full">
            <button class="flex relative gap-2 w-full">
              <div class="cursor-pointer py-1.5 -my-2 group-focus-within:-mr-4 group-focus-within:invisible">
                <Icon name="heroicons-outline:magnifying-glass" size="20"></Icon>
              </div>
              <div class="relative flex-grow">
                <input
                  class="w-full bg-transparent outline-none placeholder:text-[#a8a8a8]"
                  type="text"
                  v-model="searchTerm"
                  :placeholder="selectedCategory ? `Search in ${selectedCategory}` : 'Search'" />
              </div>
              <div @click="searchTerm = null" class="cursor-pointer py-1.5 -my-2 mr-2 group-focus-within:visible invisible">
                <Icon v-if="!loading" name="mingcute:close-circle-fill" size="20" />
                <Icon v-else-if="loading" name="Loading" size="20" />
              </div>
            </button>
          </label>
        </div>
        <div class="justify-end flex gap-[60px] col-span-2">
          <div
            @click.stop="
              isDropdownCategory = !isDropdownCategory;
              isDropdownSortBy = false;
            "
            :class="{ activeTab: isDropdownCategory }"
            class="items-center dark:text-[#a8a8a8] text-xs flex h-[52px] justify-center cursor-pointer border-t border-transparent -mt-px">
            <div class="flex box-border items-center">
              <Icon name="system-uicons:grid-squares" size="22" />
              <span class="ml-1.5 font-semibold uppercase tracking-wider select-none">Category</span>
            </div>
            <Transition>
              <div v-show="isDropdownCategory" class="absolute top-full z-10 right-[55px] dropdown">
                <div class="dropdown-triangle left-[30%]"></div>
                <div class="text-sm bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden">
                  <div class="border-b dark:border-[#353535] last:border-b-0" @click="selectedCategory = ''">
                    <a class="block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">All Categories</a>
                  </div>
                  <div class="border-b dark:border-[#353535] last:border-b-0" v-for="category in categories" :key="category.id" @click="selectedCategory = category.name">
                    <a class="block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">{{ category.name }}</a>
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
            :class="{ activeTab: isDropdownSortBy }"
            class="items-center dark:text-[#a8a8a8] text-xs flex h-[52px] justify-center cursor-pointer border-t border-transparent -mt-px">
            <div class="flex box-border items-center">
              <Icon name="system-uicons:filter" size="22" />
              <span class="ml-1.5 font-semibold uppercase tracking-wider select-none">Sort by</span>
            </div>
            <Transition>
              <div v-show="isDropdownSortBy" class="absolute top-full z-10 -right-[18px] dropdown">
                <div class="dropdown-triangle left-[57%]"></div>
                <div class="text-sm bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden">
                  <div class="border-b dark:border-[#353535] last:border-b-0" v-for="(option, index) in options" :key="index" @click="selectedOption = option.value">
                    <a class="block px-4 py-2.5 hover:dark:bg-[#3c3c3c] hover:transition-all">{{ option.value }}</a>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="grid gap-1 grid-cols-3">
        <div v-for="node in products" :key="node.id" class="bg-neutral-200 dark:bg-neutral-800">
          <div class="relative pb-[133%] overflow-hidden">
            <NuxtImg loading="lazy" :title="node.name" :alt="node.image.altText || node.name" :src="node.image.sourceUrl" class="object-cover w-full h-full absolute" />
          </div>
        </div>
        <div v-if="loading" v-for="node in 9" :key="node" class="animate-pulse bg-neutral-200 dark:bg-neutral-800">
          <div class="relative pb-[133%] overflow-hidden"></div>
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
const formattedDate = ref('');
const isDropdownSortBy = ref(false);
const isDropdownCategory = ref(false);
const router = useRouter();
const route = useRoute();
const searchTerm = ref(route.query.search || null);
const selectedCategory = ref(route.query.category || '');
const sortByOrder = ref(route.query.orderby && route.query.orderby !== '' ? route.query.orderby : 'DESC');
const sortByField = ref(route.query.fieldby && route.query.fieldby !== '' ? route.query.fieldby : 'DATE');
const variables = ref({
  search: searchTerm,
  category: selectedCategory,
  order: sortByOrder,
  field: sortByField,
});

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  });
  let formatted = formatter.format(date);
  formatted = formatted.replace(/,/g, '');
  return formatted;
};

const updateDate = () => {
  formattedDate.value = formatDate(new Date());
};

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
  const loadMorePosition = document.documentElement.scrollHeight - 400;

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

updateDate();
let timer;
onMounted(() => {
  updateDate();
  timer = setInterval(updateDate, 1000);
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  clearInterval(timer);
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
.dropdown {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}
.dropdown-triangle {
  @apply absolute dark:bg-neutral-800 h-5 w-4 -top-[10px] rotate-90;
  clip-path: path('M8 0C8 4 9.32406e-08 7.819 1.25211e-07 10.5C1.57188e-07 13.1815 8 17.0005 8 21L8 0Z');
}
.v-enter-active {
  @apply transition ease-out duration-100;
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
  @apply transition ease-in duration-75;
}
.activeTab {
  @apply text-neutral-100 border-neutral-100;
}
</style>
