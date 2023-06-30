<template>
  <div class="flex items-center gap-4 px-20 h-[58px]">
    <ButtonSelectCategory />
  </div>
  <div class="grid grid-cols-7 gap-4 px-20 mt-4">
    <ProductCard :products="products" />
    <ProductsSkeleton v-if="loading" />
  </div>
  <ProductsEmpty v-if="!productsEmpty" />
</template>

<script setup>
const { products, loading, productsEmpty } = useProducts();
</script>
