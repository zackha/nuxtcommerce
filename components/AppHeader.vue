<script setup>
const router = useRouter();
const route = useRoute();
const searchQuery = ref((route.query.q || '').toString());
const searchResults = ref([]);
const isLoading = ref(false);
const suggestionMenu = ref(false);
const onClickOutsideRef = ref(null);
const cart = ref(false);

const search = () => {
  router.push({ path: '/', query: { ...route.query, q: searchQuery.value || undefined } });
  suggestionMenu.value = false;
};

async function fetch() {
  try {
    const response = await searchProducts(searchQuery.value);
    searchResults.value = response.products.nodes;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetch);

const throttledFetch = useDebounceFn(async () => {
  await fetch();
}, 300);

watch(
  () => searchQuery.value,
  () => {
    isLoading.value = true;
    throttledFetch();
  }
);

const clearSearch = () => {
  suggestionMenu.value = false;
  searchQuery.value = '';
  router.push({ query: { ...route.query, q: undefined } });
};

onClickOutside(onClickOutsideRef, event => {
  suggestionMenu.value = false;
  cart.value = false;
});
</script>

<template>
  <div class="flex w-full flex-row items-center px-3 lg:px-5 h-[72px] lg:h-20 z-50 fixed bg-white/85 dark:bg-black/85 backdrop-blur-sm dark:backdrop-blur-lg">
    <div class="flex flex-row w-full flex-nowrap items-center gap-2">
      <NuxtLink
        aria-label="Home"
        class="flex items-center justify-center min-w-[52px] min-h-[52px] max-lg:min-w-12 max-lg:min-h-12 hover:bg-black/5 hover:dark:bg-white/15 max-lg:dark:bg-white/15 max-lg:bg-black/5 max-lg:hover:bg-black/10 max-lg:hover:dark:bg-white/20 rounded-2xl max-lg:rounded-full transition active:scale-95"
        to="/">
        <svg viewBox="0 0 30.72 30.72" class="rounded-lg max-lg:rounded-full bg-[#b31015] w-8 h-8">
          <path
            d="M -1e-4,1e-4 H 15.3296 C 14.7944,0.0047 14.2692,0.1464 13.8054,0.4117 13.334,0.6813 12.9429,1.0691 12.6707,1.536 L -1e-4,23.2893 Z m 15.3807,0 h 15.3392 v 5.1132 c -0.4077,-0.1874 -0.8524,-0.2855 -1.304,-0.2855 -0.5439,0 -1.0786,0.142 -1.5494,0.4116 -0.4711,0.2696 -0.8623,0.6577 -1.1341,1.1245 L 23.7908,11.4167 18.0395,1.536 C 17.7674,1.0691 17.376,0.6813 16.9048,0.4117 16.4411,0.1464 15.9158,0.0047 15.3806,1e-4 Z M 30.7198,13.6563 V 25.8989 H 26.6036 L 23.791,30.7198 H 11.8305 c 4.2401,-0.0117 7.3693,-1.8658 9.5244,-5.4729 l 5.2487,-9.0088 2.8114,-4.8214 z M 11.6157,25.8941 4.1115,25.8924 15.3602,6.5839 l 5.6126,9.6542 -3.7579,6.4525 c -1.4357,2.348 -3.0668,3.2035 -5.5992,3.2035 z"
            fill="#ed3237" />
        </svg>
      </NuxtLink>
      <NuxtLink
        aria-label="Categories"
        exactActiveClass="bg-black dark:bg-white text-white dark:text-black"
        class="font-semibold cursor-pointer px-4 rounded-full hover:bg-black hover:dark:bg-white h-12 items-center justify-center hover:text-white hover:dark:text-black transition active:scale-95 lg:flex hidden"
        to="/categories">
        Categories
      </NuxtLink>
      <NuxtLink
        aria-label="Favorites"
        exactActiveClass="bg-black dark:bg-white text-white dark:text-black"
        class="font-semibold cursor-pointer px-4 rounded-full hover:bg-black hover:dark:bg-white h-12 items-center justify-center hover:text-white hover:dark:text-black transition active:scale-95 lg:flex hidden"
        to="/favorites">
        Favorites
      </NuxtLink>
      <NuxtLink
        aria-label="Categories"
        exactActiveClass="!bg-black/10 dark:!bg-white/30"
        class="lg:hidden flex items-center justify-center min-w-12 min-h-12 rounded-full bg-black/5 dark:bg-white/15 hover:bg-black/10 hover:dark:bg-white/20 transition active:scale-95"
        to="/categories">
        <UIcon class="text-[#5f5f5f] dark:text-[#b7b7b7]" name="i-iconamoon-category-fill" size="26" />
      </NuxtLink>
      <NuxtLink
        aria-label="Favorites"
        exactActiveClass="!bg-black/10 dark:!bg-white/30"
        class="lg:hidden flex items-center justify-center min-w-12 min-h-12 rounded-full bg-black/5 dark:bg-white/15 hover:bg-black/10 hover:dark:bg-white/20 transition active:scale-95"
        to="/favorites">
        <UIcon class="text-[#5f5f5f] dark:text-[#b7b7b7]" name="i-iconamoon-heart-fill" size="26" />
      </NuxtLink>
      <div class="flex flex-shrink flex-grow flex-col text-sm font-semibold text-[#111] dark:text-[#eee]">
        <div
          :class="[
            'flex h-12 flex-grow rounded-full  pl-4 pr-3 transition-all hover:bg-black/10 hover:dark:bg-white/20',
            suggestionMenu ? 'bg-black/10 dark:bg-white/20' : 'bg-black/5 dark:bg-white/15',
          ]">
          <div @click="suggestionMenu = true" class="flex w-full items-center gap-4">
            <div v-if="!suggestionMenu" class="flex text-neutral-500 dark:text-neutral-400">
              <UIcon name="i-iconamoon-search-bold" size="20" />
            </div>
            <div class="flex w-full">
              <input
                class="w-full bg-transparent py-2 outline-none placeholder:text-[#757575] placeholder:dark:text-neutral-400"
                type="text"
                v-model="searchQuery"
                @keyup.enter="search"
                :placeholder="route.query.category ? `Search in ${route.query.category}...` : 'Search...'" />
              <div v-if="searchQuery || suggestionMenu" @click.stop="clearSearch" class="flex items-center justify-center cursor-pointer transition-all">
                <UIcon v-if="!isLoading" class="text-black dark:text-white" name="i-iconamoon-close-circle-1-fill" size="24" />
                <UIcon v-else name="i-svg-spinners-bars-rotate-fade" size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        @click="cart = !cart"
        class="hover:bg-black/5 hover:dark:bg-white/15 max-lg:dark:bg-white/15 max-lg:bg-black/5 max-lg:hover:bg-black/10 max-lg:hover:dark:bg-white/20 min-w-12 min-h-12 flex items-center justify-center rounded-full cursor-pointer">
        <UIcon class="text-[#5f5f5f] dark:text-[#b7b7b7]" name="i-iconamoon-shopping-bag-fill" size="26" />
      </div>
    </div>
  </div>
  <div
    v-if="suggestionMenu"
    ref="onClickOutsideRef"
    class="fixed top-[72px] lg:top-20 left-0 right-0 z-50 bg-white/85 dark:bg-black/85 backdrop-blur-sm dark:backdrop-blur-lg lg:rounded-b-3xl w-full">
    <div class="max-h-[calc(100vh-72px)] lg:max-h-[calc(100vh-80px)] overflow-auto">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-80">
        <div class="bg-black/10 dark:bg-white/20 flex rounded-full w-12 h-12 items-center justify-center skeleton">
          <UIcon class="text-white dark:text-black" name="i-svg-spinners-8-dots-rotate" size="26" />
        </div>
      </div>
      <!-- Empty State -->
      <div v-else-if="!searchResults.length" class="w-full items-center flex flex-col justify-center text-center p-8">
        <div class="w-28 h-28 bg-black/10 dark:bg-white/20 rounded-full items-center justify-center flex">
          <UIcon name="i-iconamoon-search-bold" class="w-16 h-16 dark:text-white" />
        </div>
        <div class="font-semibold text-3xl my-6">
          No items matching for:
          <strong>{{ searchQuery }}</strong>
        </div>
        <div class="text-sm text-center mb-5">
          Try improving your results by double checking your spelling
          <br />
          or trying a more general keyword.
        </div>
      </div>
      <!-- Results State-->
      <div v-else class="mx-auto p-3 lg:p-4 max-w-screen-2xl">
        <h2 v-if="!searchQuery" class="text-2xl font-bold tracking-tight">New Products</h2>
        <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-5 mt-3 lg:mt-5">
          <NuxtLink
            @click="suggestionMenu = false"
            :to="`/product/${product.slug}-${product.sku.split('-')[0]}`"
            v-for="(product, i) in searchResults"
            :key="i"
            class="group select-none">
            <div class="cursor-pointer transition ease-[ease] duration-300">
              <div class="relative pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-2xl overflow-hidden">
                <NuxtImg
                  :alt="product.name"
                  loading="lazy"
                  :title="product.name"
                  :src="product.galleryImages.nodes[0].sourceUrl"
                  class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover" />
                <NuxtImg
                  :alt="product.name"
                  loading="lazy"
                  :title="product.name"
                  :src="product.image.sourceUrl"
                  class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <div class="grid gap-0.5 pt-3 pb-4 px-1.5 text-sm font-semibold">
                <div class="flex gap-1">
                  <div v-html="product.salePrice"></div>
                  <div class="text-[#5f5f5f] dark:text-[#a3a3a3] line-through" v-html="product.regularPrice"></div>
                </div>
                <div>{{ product.name }}</div>
                <div class="font-normal text-[#5f5f5f] dark:text-[#a3a3a3]">
                  {{ product.allPaStyle.nodes[0].name }}
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-if="searchQuery && !isLoading && searchResults.length" class="flex items-center justify-center border-t border-black/10 dark:border-white/20 p-4">
        <button
          @click="search"
          class="bg-black/15 dark:bg-white/15 hover:bg-black/10 hover:dark:bg-white/20 px-4 py-2 rounded-full active:scale-95 tracking-wide text-sm transition">
          View All Results
        </button>
      </div>
    </div>
  </div>
  <div v-if="suggestionMenu || cart" class="fixed inset-0 z-40">
    <div class="w-full h-full bg-black/30 backdrop-blur-lg"></div>
  </div>
  <div
    v-if="cart"
    ref="onClickOutsideRef"
    class="select-none mt-[100px] mx-5 shadow-2xl rounded-[2rem] right-0 fixed flex z-50 bg-white/85 dark:bg-black/85 dark:border dark:border-white/15 cart-button-bezel backdrop-blur-lg overflow-hidden">
    <div class="w-80 relative">
      <div class="absolute h-full w-full overflow-auto">
        <div v-for="i in 5" :key="i" class="flex bg-black/5 dark:bg-white/10 m-3 p-3 rounded-3xl overflow-hidden items-center">
          <img src="https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/7803315-615-1-300x450.jpg" class="w-24 h-24 object-cover shadow-md rounded-2xl" />
          <div class="flex-1 px-3 gap-1 flex flex-col">
            <div class="font-semibold text-sm">Striped triangle bikini top Orange</div>
            <div class="text-xs font-medium text-neutral-600 dark:text-neutral-400">Size: XL • Qty: 1</div>
            <div class="font-bold">$27.90</div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-96 h-full bg-black/5 dark:bg-white/10 my-3 mr-3 p-3 rounded-3xl">
      <div class="text-xl font-bold px-2 mb-3">Checkout</div>
      <div class="flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 gap-3">
          <div class="col-span-full">
            <input
              placeholder="Email address"
              id="email"
              name="email"
              type="email"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div class="col-span-1">
            <input
              placeholder="First name"
              id="first-name"
              name="first-name"
              type="text"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div class="col-span-1">
            <input
              placeholder="Last name"
              id="last-name"
              name="last-name"
              type="text"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div class="col-span-1">
            <input
              placeholder="Phone number"
              id="phone"
              name="phone"
              type="text"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div class="col-span-1">
            <input
              placeholder="City"
              id="city"
              name="city"
              type="text"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
          </div>
          <div class="col-span-full">
            <textarea
              placeholder="Address"
              id="address"
              name="address"
              rows="2"
              class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black"></textarea>
          </div>
        </div>
        <div class="text-sm font-semibold p-4 text-neutral-600 dark:text-neutral-400">Paying a total of $215 for 4 products.</div>
        <button class="pay-button-bezel w-full h-12 rounded-xl font-semibold text-white text-lg flex justify-center items-center">Pay $215</button>
        <div class="text-xs font-medium p-4 flex gap-1 items-end text-neutral-400 dark:text-neutral-600">
          <UIcon name="i-iconamoon-lock-fill" size="18" />
          <div>Your payment is secured by Stripe</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
textarea {
  resize: none;
}
.pay-button-bezel {
  box-shadow: 0 0 0 var(--button-outline, 0px) rgba(92, 133, 222, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 1px 1px 0 rgba(0, 0, 0, 0.3);
  @apply bg-[#2D68FF] outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;
  &:hover {
    @apply bg-[#4177ff];
  }
  &:active {
    --button-outline: 4px;
    --button-scale: 0.975;
  }
}

.cart-button-bezel {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar {
  @apply w-0 bg-transparent;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-black/15 dark:bg-white/15 rounded-full border-solid border-white dark:border-black;
  border-width: 5px;
}
</style>
