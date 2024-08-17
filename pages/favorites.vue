<script setup>
const { removeFromList, wishlist } = useWishlist();
</script>

<template>
  <div class="flex flex-wrap justify-center max-w-screen-2xl m-auto">
    <TransitionGroup
      v-if="wishlist.length"
      name="shrink"
      tag="div"
      mode="in-out"
      v-for="product in wishlist"
      :key="product.databaseId"
      class="w-full sm:max-w-[300px] p-3 lg:p-2 relative select-none">
      <div class="relative overflow-hidden pb-[125%] rounded-[32px]">
        <NuxtImg :alt="product.name" class="absolute w-full h-full object-cover bg-neutral-200 dark:bg-neutral-800" :src="product.image.sourceUrl" loading="lazy" />
        <NuxtLink class="absolute inset-0 bg-gradient-to-t from-black/50 hover:from-black/60 flex items-end p-5" :to="`/product/${product.slug}-${product.sku.split('-')[0]}`">
          <div class="grid gap-0.5 text-white">
            <div class="flex gap-2 text-sm">
              <span v-html="product.salePrice"></span>
              <span class="line-through text-white/50" v-html="product.regularPrice"></span>
            </div>
            <div class="font-bold">{{ product.name }}</div>
            <div class="text-sm font-medium">{{ product.allPaStyle.nodes[0].name }}</div>
          </div>
        </NuxtLink>
      </div>
      <button class="absolute top-5 right-5 group" title="Remove Product" @click="removeFromList(product.databaseId)">
        <div class="w-12 h-12 rounded-full flex justify-center items-center bg-alizarin-crimson-950/90 shadow-md">
          <UIcon name="i-iconamoon-heart-fill" size="26" class="text-alizarin-crimson-500 group-hover:text-white transition pulse-heart" />
        </div>
      </button>
    </TransitionGroup>
    <div
      v-else
      class="w-full flex flex-col items-center px-5 min-h-[calc(100vh-152px)] justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black rounded-xl">
      <div
        class="bg-alizarin-crimson-100 dark:bg-alizarin-crimson-950 rounded-full p-6 flex items-center shadow-2xl shadow-alizarin-crimson-300 dark:shadow-alizarin-crimson-950 justify-center">
        <UIcon name="i-iconamoon-heart-fill" class="w-20 h-20 text-alizarin-crimson-400 dark:text-alizarin-crimson-700 pulse-heart" />
      </div>
      <div class="font-extrabold text-3xl my-6">Nothing to show... yet!</div>
      <div class="text-sm text-center mb-5">
        Wishlist you create will live here.
        <br />
        These are a few of your favorite things...
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.shrink-move,
.shrink-enter-active,
.shrink-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.shrink-enter-from,
.shrink-leave-to {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
.shrink-leave-active {
  position: absolute;
}

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
