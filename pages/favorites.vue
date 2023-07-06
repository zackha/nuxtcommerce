<template>
  <div>
    <div v-for="product in products" :key="product.id" class="flex gap-2">
      <div>{{ product.title }}</div>
      <button @click="toggleWishlist(product)">
        <Icon :name="wishlist.includes(product.id) ? 'iconamoon:heart-fill' : 'iconamoon:heart'" size="16" />
      </button>
    </div>
    <br />
    <div class="text-2xl">Wishlist</div>
    <div v-for="id in wishlist" :key="id" class="flex gap-2">
      <div>{{ getWishlist(id) }}</div>
      <button @click="toggleWishlist({ id })">
        <Icon name="iconamoon:close" size="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
const products = ref([
  { id: 1, title: 'Product 1' },
  { id: 2, title: 'Product 2' },
  { id: 3, title: 'Product 3' },
  // Daha fazla ürün eklenebilir
]);
const wishlist = ref([]);

onMounted(() => {
  if (process.client) {
    const storedWishlist = window.localStorage.getItem('wishlist');
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist);
    }
  }
});

const toggleWishlist = (product) => {
  if (wishlist.value.includes(product.id)) {
    wishlist.value = wishlist.value.filter((id) => id !== product.id);
  } else {
    wishlist.value.push(product.id);
  }

  if (process.client) {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  }
};

const getWishlist = (id) => {
  const product = products.value.find((product) => product.id === id);
  return product ? product.title : '';
};
</script>
