<template>
  <AppHeader />
  <div class="pt-20">
    <div class="flex items-center gap-4 px-20 h-[58px]">
      <ButtonSelectCategory />
    </div>
    <div class="grid grid-cols-7 gap-4 px-20 mt-4">
      <ProductCard :products="products" />
      <ProductSkeleton v-if="loading" />
    </div>
  </div>
</template>

<script setup>
const { products, loading } = useProducts();
</script>
