<template>
  <div class="relative flex flex-shrink flex-grow flex-col text-sm font-semibold text-neutral-600 px-2">
    <form class="group flex h-12 flex-grow rounded-full bg-[#e9e9e9] pl-4 pr-3 transition-all hover:bg-[#e1e1e1]">
      <div class="flex w-full items-center gap-4">
        <div class="flex text-neutral-500 dark:text-neutral-400">
          <Icon name="iconamoon:search-bold" size="20" />
        </div>
        <div class="flex w-full">
          <input
            class="w-full bg-transparent py-2 outline-none placeholder:text-[#757575] placeholder:dark:text-neutral-500"
            v-model="searchQuery"
            @keydown.enter="search"
            @click.stop="suggestionMenu = true"
            placeholder="Search" />
        </div>
        <div v-if="suggestionMenu" class="flex cursor-pointer text-black dark:text-neutral-500 transition-all" @click="clearSearch">
          <Icon v-if="!loading" name="carbon:close-filled" size="24" />
          <Icon v-else name="Loading" size="20" />
        </div>
      </div>
    </form>

    <div v-if="suggestionMenu" id="suggestionMenu" class="absolute top-full left-0 right-0 z-10 mt-3 bg-white border rounded-xl w-full">
      <div class="m-2">
        <div v-if="loading">Loading...</div>
        <div v-else-if="searchResult.length === 0">Empty</div>
        <div v-else v-for="product in searchResult">
          <NuxtLink :to="`/product/${product.slug}-${product.sku.split('-')[0]}`">
            <div>{{ product.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getSearchProducts from '~/gql/queries/getSearchProducts.gql';

const searchQuery = ref();
const suggestionMenu = ref(false);
const router = useRouter();

const { result, loading } = useQuery(getSearchProducts, () => ({ search: searchQuery.value }));
const searchResult = computed(() => result.value?.products.nodes);

const clearSearch = () => {
  suggestionMenu.value = false;
  searchQuery.value = '';
};

const clickOutsideHandler = (event) => {
  if (!event.target.closest('#suggestionMenu')) {
    clearSearch();
  }
};

onMounted(() => {
  window.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
  window.removeEventListener('click', clickOutsideHandler);
});

async function search() {
  router.push({ path: '/', query: { search: searchQuery.value } });
}
</script>
