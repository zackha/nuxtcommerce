<template>
  <button @click="toggleWishlist(props.product)">
    <div class="w-12 h-12 rounded-md ml-4 flex justify-center items-center border-2 border-[#e6e6e6] dark:border-[#262626]">
      <Icon :name="isWishlisted ? 'ph:heart-fill' : 'ph:heart-bold'" size="24" :class="isWishlisted ? 'text-[#e60023]' : 'text-[#8c8c8c]'" />
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const { isWishlisted, toggleWishlist } = useWishlist(props.product);
</script>
