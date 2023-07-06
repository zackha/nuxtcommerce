<template>
  <div>
    <div v-for="product in products" :key="product.id" class="flex gap-2 items-center mb-2">
      <img :src="product.image" />
      <div>{{ product.title }}</div>
      <button @click="toggleWishlist(product.id)">
        <Icon :name="inWishlist[product.id] ? 'iconamoon:heart-fill' : 'iconamoon:heart'" size="16" />
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
const products = ref([
  { id: 1, title: 'Product 1', image: 'https://loremflickr.com/50/50' },
  { id: 2, title: 'Product 2', image: 'https://loremflickr.com/50/50' },
  { id: 3, title: 'Product 3', image: 'https://loremflickr.com/50/50' },
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

const toggleWishlist = (id) => {
  const index = wishlist.value.indexOf(id);
  if (index !== -1) {
    wishlist.value.splice(index, 1);
  } else {
    wishlist.value.push(id);
  }

  if (process.client) {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  }
};

const wishlistProducts = computed(() => {
  let result = {};
  for (let id of wishlist.value) {
    let product = products.value.find((product) => product.id === id);
    if (product) {
      result[id] = product;
    }
  }
  return result;
});

const inWishlist = computed(() => {
  let result = {};
  for (let product of products.value) {
    result[product.id] = wishlist.value.includes(product.id);
  }
  return result;
});
</script>
