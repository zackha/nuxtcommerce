<template>
  <div class="flex">
    <div class="mx-auto box-content w-[calc(100%+40px)] max-w-[935px] grow p-1">
      <div role="tablist" class="my-4 flex max-w-full flex-col items-stretch">
        <div class="flex flex-row flex-nowrap items-center gap-4">
          <div class="flex items-center justify-center">
            <NuxtLink to="/">
              <img class="mx-auto my-0 h-10 rounded-xl" src="/logo.png" alt="logo" />
            </NuxtLink>
          </div>
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
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
        <ProductSkeleton v-if="loading" />
      </div>
      <ProductEmpty v-if="!empty && !loading" :cat="selectedCategory" :term="searchTerm" />
      <Footer />
    </div>
  </div>
</template>

<script setup>
const { products, empty, loading, categories, options, searchTerm, selectedCategory, selectedOption, isDropdownCategory, isDropdownSortBy } = useSearch();
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
