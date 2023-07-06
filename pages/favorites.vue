<template>
  <div>
    <div v-for="product in theList" :key="product.databaseId">
      {{ product.name }}
      <button class="ml-2" title="Remove Item" @click="removeFromList(product.databaseId)">remove</button>
    </div>
  </div>
</template>

<script setup>
const theList = ref([]);

const updateLocalStorage = () => {
  localStorage.setItem('wishlist', JSON.stringify(theList.value));
};

const removeFromList = (databaseId) => {
  theList.value = theList.value.filter((item) => item.databaseId !== databaseId);
  updateLocalStorage();
};

onMounted(() => {
  const wishlist = localStorage.getItem('wishlist');
  if (wishlist) theList.value = JSON.parse(wishlist);
});
</script>
