<template>
  <div role="tablist" class="my-4 flex max-w-full flex-col items-stretch">
    <div class="flex flex-row flex-nowrap items-center gap-4">
      <Logo />
      <ProductSearchBox :searchTerm="searchTerm" :selectedCategory="selectedCategory" :loading="loading" v-model:searchTerm="searchTerm" />
      <ButtonSelectCategory @click.stop="toggleDropdown('category')" :show="isDropdownCategory" :categories="categories" v-model:selectedCategory="selectedCategory" />
      <ButtonSortBy @click.stop="toggleDropdown('sortBy')" :show="isDropdownSortBy" :options="options" v-model:selectedOption="selectedOption" />
    </div>
  </div>
  <div class="grid grid-cols-3 gap-4">
    <ProductCard :products="products" />
    <ProductSkeleton v-if="loading" />
  </div>
  <ProductEmpty v-if="!empty" :selectedCategory="selectedCategory" :searchTerm="searchTerm" />
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
