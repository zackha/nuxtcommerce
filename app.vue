<template>
  <div class="mx-auto box-content w-full max-w-[935px] grow p-1">
    <div role="tablist" class="my-4 flex max-w-full flex-col items-stretch">
      <div class="flex flex-row flex-nowrap items-center gap-4">
        <Logo />
        <ProductSearchBox :searchTerm="searchTerm" :selectedCategory="selectedCategory" :loading="loading" v-model:searchTerm="searchTerm" />
        <ButtonSelectCategory @click.stop="toggleDropdown('category')" :show="isDropdownCategory" :categories="categories" v-model:selectedCategory="selectedCategory" />
        <ButtonSortBy @click.stop="toggleDropdown('sortBy')" :show="isDropdownSortBy" :options="options" v-model:selectedOption="selectedOption" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
      <ProductSkeleton v-if="loading" />
    </div>
    <ProductEmpty v-if="!empty" :selectedCategory="selectedCategory" :searchTerm="searchTerm" />
    <AppFooter />
  </div>
</template>

<script setup>
const { products, empty, loading, categories, options, searchTerm, selectedCategory, selectedOption, isDropdownCategory, isDropdownSortBy } = useSearch();

const toggleDropdown = (type) => {
  if (type === 'category') {
    isDropdownCategory.value = !isDropdownCategory.value;
    isDropdownSortBy.value = false;
  } else if (type === 'sortBy') {
    isDropdownSortBy.value = !isDropdownSortBy.value;
    isDropdownCategory.value = false;
  }
};
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
