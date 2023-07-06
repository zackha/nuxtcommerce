<template>
  <button @click="toggleWishlist(product)">
    <div class="w-12 h-12 rounded-md ml-4 flex justify-center items-center border-2 text-[#8c8c8c] border-[#e6e6e6] dark:border-[#262626]">
      <Icon :name="inWishlist[product.databaseId] ? 'ph:heart-fill' : 'ph:heart-bold'" size="24" />
    </div>
  </button>
</template>

<script setup>
defineProps({
  product: Object,
});

const { toggleWishlist, inWishlist } = useWishlist();
</script>
