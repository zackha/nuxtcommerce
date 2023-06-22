<template>
  <div role="tablist" class="flex w-full flex-row items-center px-4 py-1 h-20 z-50 fixed bg-white">
    <div class="flex flex-row w-full flex-nowrap items-center h-14">
      <div class="flex items-center justify-center w-12 h-12 hover:bg-[#e9e9e9] rounded-full">
        <NuxtLink to="/">
          <Icon name="Logo" size="32" />
        </NuxtLink>
      </div>
      <div class="font-semibold px-4 rounded-full hover:bg-black h-12 flex items-center justify-center hover:text-white">Categories</div>
      <div class="font-semibold px-4 rounded-full hover:bg-black h-12 flex items-center justify-center hover:text-white">Favorites</div>
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
        <div v-if="suggestionMenu" id="suggestionMenu" class="absolute top-full left-0 right-0 z-50 bg-white rounded-b-2xl w-full">
          <div class="m-8">
            <!-- Loading State -->
            <div v-if="loading">Loading...</div>
            <!-- Empty State -->
            <div v-else-if="searchResult.length === 0">
              <div class="p-6 text-center text-lg">
                <Icon name="majesticons:search-line" size="99"></Icon>
                <div class="py-4">
                  <span v-if="searchQuery">
                    there are no items matching for: <strong>{{ searchQuery }}</strong>
                  </span>
                </div>
                <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
              </div>
            </div>
            <!-- Results State -->
            <div v-else>
              <div v-if="!searchQuery" class="font-semibold text-base text-[#111] my-2">New</div>
              <div class="items-center gap-2 flex">
                <NuxtLink :to="`/product/${product.slug}-${product.sku.split('-')[0]}`" v-for="product in searchResult" class="flex items-center border border-red-700 rounded-xl">
                  <div class="h-28 rounded-lg overflow-hidden m-1 border border-red-700">
                    <NuxtImg class="w-full h-full" :src="product.image.sourceUrl" />
                  </div>
                  <div class="">
                    {{ product.name }}
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hover:bg-[#e9e9e9] w-12 h-12 flex items-center justify-center rounded-full"><Icon color="#5f5f5f" name="fa6-solid:bag-shopping" size="22" /></div>
    </div>
  </div>
  <div v-if="suggestionMenu" class="fixed inset-0 z-40">
    <div class="w-full h-full bg-black/50"></div>
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
