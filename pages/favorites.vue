<template>
  <div v-for="product in wishlist" :key="product.databaseId">
    {{ product.name }}
    <button class="ml-2" title="Remove Item" @click="removeFromList(product.databaseId)">remove</button>
  </div>
</template>

<script setup>
const { removeFromList, wishlist } = useWishlist();
</script>
