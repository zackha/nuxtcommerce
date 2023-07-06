<template>
  <button @click="toggleWishlist(props.product)">
    <div class="w-12 h-12 rounded-md ml-4 flex justify-center items-center border-2 text-[#8c8c8c] border-[#e6e6e6] dark:border-[#262626]">
      <Icon :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'" size="24" />
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const wishlist = ref(JSON.parse(localStorage.getItem('wishlist')) || []);

const isWishlisted = computed(() => wishlist.value.some((item) => item.databaseId === props.product.databaseId));

const toggleWishlist = (item) => {
  if (isWishlisted.value) {
    wishlist.value = wishlist.value.filter((item) => item.databaseId !== props.product.databaseId);
  } else {
    wishlist.value.push(item);
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
};
</script>
