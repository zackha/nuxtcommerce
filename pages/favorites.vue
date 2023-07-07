<template>
  <div v-if="wishlist.length" v-for="product in wishlist" :key="product.databaseId">
    {{ product.name }}
    <button class="ml-2" title="Remove Item" @click="removeFromList(product.databaseId)">remove</button>
  </div>
  <div v-else>Empty</div>
</template>

<script setup>
const { removeFromList, wishlist } = useWishlist();
</script>
