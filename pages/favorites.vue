<template>
  <div>
    <div v-for="product in products" :key="product.databaseId" class="flex gap-2 items-center mb-2">
      <img :src="product.image" />
      <div>{{ product.title }}</div>
      <button @click="toggleWishlist(product.databaseId)">
        <Icon :name="inWishlist[product.databaseId] ? 'iconamoon:heart-fill' : 'iconamoon:heart'" size="16" />
      </button>
    </div>

    <br />

    <div class="text-2xl">Wishlist</div>
    <div v-for="id in wishlist" :key="id" class="flex gap-2 items-center mb-2">
      <img :src="wishlistProducts[id].image" />
      <div>{{ wishlistProducts[id].title }}</div>
      <button @click="toggleWishlist(id)">
        <Icon name="iconamoon:close" size="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
const { products, toggleWishlist, wishlistProducts, inWishlist, wishlist } = useWishlist();
</script>
