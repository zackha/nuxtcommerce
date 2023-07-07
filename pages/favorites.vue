<template>
  <div v-if="wishlist.length" v-for="product in wishlist" :key="product.databaseId">
    <NuxtLink :to="`/product/${product.slug}-${product.sku.split('-')[0]}`" class="group">
      {{ product.name }}
    </NuxtLink>
    <button class="ml-2" title="Remove Item" @click="removeFromList(product.databaseId)">remove</button>
  </div>
  <div v-else class="p-6 text-center text-lg">
    <Icon color="#e60023" name="solar:heart-bold" class="pulse-heart" size="120"></Icon>
    <div class="py-4">
      <span> Nothing to show...yet! Wishlist you create will live here. </span>
    </div>
    <div class="text-sm">These are a few of your favorite things... or they will be, once you favorite something.</div>
  </div>
</template>

<script setup>
const { removeFromList, wishlist } = useWishlist();
</script>

<style lang="postcss">
@keyframes animateHeart {
  0% {
    transform: scale(0.9);
  }
  5% {
    transform: scale(1.1);
  }
  10% {
    transform: scale(0.9);
  }
  15% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
}

.pulse-heart {
  animation: animateHeart 1.2s infinite;
}
</style>
