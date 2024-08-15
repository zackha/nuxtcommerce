<script setup>
const props = defineProps({
  product: Object,
});

const { isWishlisted, toggleWishlist } = useWishlist(props.product);
</script>

<template>
  <button @click="toggleWishlist(props.product)" class="active:scale-95 transition">
    <div
      :class="[
        'w-12 h-12 rounded-full ml-3 flex justify-center items-center',
        isWishlisted ? 'bg-alizarin-crimson-100 dark:bg-alizarin-crimson-950' : 'bg-neutral-200 dark:bg-neutral-800',
      ]">
      <UIcon
        :name="isWishlisted ? 'i-iconamoon-heart-fill' : 'i-iconamoon-heart'"
        size="26"
        :class="isWishlisted ? 'text-alizarin-crimson-400 dark:text-alizarin-crimson-700 pulse-heart' : 'text-neutral-900 dark:text-neutral-200'" />
    </div>
  </button>
</template>
