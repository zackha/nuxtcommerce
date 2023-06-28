<template>
  <AppHeader />
  <div class="pt-20">
    <div class="flex items-center gap-4 px-20 h-[58px]">
      <ButtonSelectCategory @click.stop="toggleDropdown('category')" :show="isDropdownCategory" :categories="categories" v-model:selectedCategory="selectedCategory" />
      <ButtonSortBy @click.stop="toggleDropdown('sortBy')" :show="isDropdownSortBy" :options="options" v-model:selectedOption="selectedOption" />
    </div>
    <div class="grid grid-cols-7 gap-4 px-20 mt-4">
      <ProductCard :products="products" />
      <ProductSkeleton v-if="loading" />
    </div>
  </div>
</template>

<script setup>
const { products, loading, categories, options, selectedCategory, selectedOption, isDropdownCategory, isDropdownSortBy } = useProducts();

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
