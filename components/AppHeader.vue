<template>
  <div role="tablist" class="flex w-full flex-row items-center px-4 py-1 h-20 z-50 fixed bg-white dark:bg-black">
    <div class="flex flex-row w-full flex-nowrap items-center h-14">
      <div class="flex items-center justify-center w-12 h-12 hover:bg-[#e9e9e9] hover:dark:bg-[#262626] rounded-[14px]">
        <NuxtLink to="/">
          <Icon name="Logo" size="32" />
        </NuxtLink>
      </div>
      <NuxtLink
        class="font-semibold cursor-pointer px-4 rounded-full hover:bg-black hover:dark:bg-white h-12 flex items-center justify-center hover:text-white hover:dark:text-black"
        to="/categories">
        Categories
      </NuxtLink>
      <NuxtLink
        class="font-semibold cursor-pointer px-4 rounded-full hover:bg-black hover:dark:bg-white h-12 flex items-center justify-center hover:text-white hover:dark:text-black"
        to="/favorites">
        Favorites
      </NuxtLink>
      <div class="relative flex flex-shrink flex-grow flex-col text-sm font-semibold text-[#111] dark:text-[#eee] px-2">
        <form
          class="flex h-12 flex-grow rounded-full bg-[#e9e9e9] dark:bg-[#262626] pl-4 pr-3 transition-all hover:bg-[#e1e1e1]"
          @submit.prevent="
            setSearch(searchQuery);
            suggestionMenu = false;
          ">
          <div class="flex w-full items-center gap-4">
            <div v-if="!suggestionMenu" class="flex text-neutral-500 dark:text-neutral-400">
              <Icon name="iconamoon:search-bold" size="20" />
            </div>
            <div class="flex w-full">
              <input
                class="w-full bg-transparent py-2 outline-none placeholder:text-[#757575] placeholder:dark:text-neutral-400"
                v-model="searchQuery"
                @click="suggestionMenu = !suggestionMenu"
                :placeholder="route.query.category ? `Search in ${route.query.category}` : 'Search'" />
            </div>
            <div v-if="searchQuery || suggestionMenu" class="flex cursor-pointer transition-all" @click="clearSearch">
              <Icon v-if="!loading" class="text-black dark:text-white" name="carbon:close-filled" size="24" />
              <Icon v-else name="Loading" size="20" />
            </div>
          </div>
        </form>
        <div v-if="suggestionMenu" ref="suggestionMenuRef" class="absolute top-full left-0 right-0 z-50 bg-white dark:bg-black rounded-b-2xl w-full">
          <div class="m-8">
            <!-- Loading State -->
            <div v-if="loading">Loading...</div>
            <!-- Empty State -->
            <div v-else-if="searchResult.length === 0">
              <div class="p-6 text-center text-lg">
                <Icon name="iconamoon:search-bold" size="99"></Icon>
                <div class="py-4">
                  <span>
                    No items matching for: <strong>{{ searchQuery }}</strong>
                  </span>
                </div>
                <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
              </div>
            </div>
            <!-- Results State -->
            <div v-else>
              <div v-if="!searchQuery" class="font-semibold text-base my-2">New</div>
              <div class="items-center gap-2 flex flex-wrap flex-row">
                <NuxtLink
                  :to="`/product/${product.slug}-${product.sku.split('-')[0]}`"
                  v-for="product in searchResult"
                  class="flex bg-black/5 dark:bg-[#141414] rounded-2xl overflow-hidden">
                  <div class="relative w-32 h-32 will-change-transform">
                    <div class="h-full relative box-border">
                      <NuxtImg class="object-cover absolute w-full h-full" :src="product.image.sourceUrl" />
                    </div>
                  </div>
                  <div class="p-4 items-center flex flex-row box-border w-60">
                    <div class="text-base">
                      {{ product.name }}
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hover:bg-[#e9e9e9] hover:dark:bg-[#262626] w-12 h-12 flex items-center justify-center rounded-full relative">
        <Icon class="text-[#5f5f5f] dark:text-[#b7b7b7]" name="fa6-solid:bag-shopping" size="22" />
        <div v-if="cart" class="w-[18px] rounded-full absolute bg-[#e60023] top-1 right-1 text-xs font-semibold leading-[16px] pb-0.5 text-center text-white">1</div>
      </div>
    </div>
  </div>
  <div v-if="suggestionMenu" class="fixed inset-0 z-40">
    <div class="w-full h-full bg-black/50"></div>
  </div>
</template>

<script setup>
import getSearchProducts from '~/gql/queries/getSearchProducts.gql';

const suggestionMenu = ref(false);
const suggestionMenuRef = ref(null);
const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query.q);
const cart = ref(false);

const { result, loading } = useQuery(getSearchProducts, () => ({ search: searchQuery.value }));
const searchResult = computed(() => result.value?.products.nodes);

const setSearch = (search) => {
  searchQuery.value = search;
  router.push({ path: '/', query: { ...route.query, q: search } });
};

const clearSearch = () => {
  suggestionMenu.value = false;
  setSearch();
};

useOnClickOutside(suggestionMenuRef, () => {
  if (suggestionMenu.value) {
    suggestionMenu.value = false;
    searchQuery.value = route.query.q;
  }
});
</script>
