<template>
  <div role="tablist" class="flex w-full flex-row items-center px-4 py-1 h-20">
    <div class="flex flex-row w-full flex-nowrap items-center h-14">
      <div class="flex items-center justify-center w-12 h-12 hover:bg-[#e9e9e9] rounded-full">
        <NuxtLink to="/">
          <Icon name="Logo" size="32" />
        </NuxtLink>
      </div>
      <div class="font-semibold px-4 rounded-full hover:bg-black h-12 flex items-center justify-center hover:text-white">Categories</div>
      <div class="font-semibold px-4 rounded-full hover:bg-black h-12 flex items-center justify-center hover:text-white">Favorites</div>
      <ProductSearchBox :searchTerm="searchTerm" :selectedCategory="selectedCategory" :loading="loading" v-model:searchTerm="searchTerm" />
      <div class="hover:bg-[#e9e9e9] w-12 h-12 flex items-center justify-center rounded-full"><Icon color="#5f5f5f" name="fa6-solid:bag-shopping" size="22" /></div>
    </div>
  </div>
  <div class="flex items-center gap-4 px-10">
    <ButtonSelectCategory @click.stop="toggleDropdown('category')" :show="isDropdownCategory" :categories="categories" v-model:selectedCategory="selectedCategory" />
    <ButtonSortBy @click.stop="toggleDropdown('sortBy')" :show="isDropdownSortBy" :options="options" v-model:selectedOption="selectedOption" />
  </div>
  <div class="grid grid-cols-7 gap-4 px-20">
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
