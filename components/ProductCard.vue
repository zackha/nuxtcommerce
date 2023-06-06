<template>
  <article v-for="product in products">
    <NuxtLink :to="`/product/${product.slug}`" class="group">
      <div
        class="cursor-pointer rounded-2xl dark:bg-secondary-bg-d hover:dark:bg-[#222222] px-4 pt-4 pb-3 transition ease-[ease] duration-300 dark:border-[#222222] hover:dark:border-[#303030] border">
        <div class="relative mb-4 pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-lg overflow-hidden">
          <NuxtImg
            loading="lazy"
            :title="product.name"
            :alt="product.image.altText || product.name"
            :src="product.galleryImages.nodes[0].sourceUrl"
            class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover" />
          <NuxtImg
            loading="lazy"
            :title="product.name"
            :alt="product.image.altText || product.name"
            :src="product.image.sourceUrl"
            class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        <div class="mb-1 grid grid-flow-col gap-6 px-2 text-sm font-semibold">
          <div class="flex min-w-0 flex-col justify-between gap-1">
            <div class="text-xs text-secondary-text dark:text-secondary-text-d transition-all hover:text-black hover:dark:text-neutral-100">
              {{ product.allPaStyle.nodes[0].name }}
            </div>
            <div :title="product.name" class="overflow-hidden text-ellipsis whitespace-nowrap">
              {{ product.name }}
            </div>
          </div>
          <div class="flex flex-col gap-1 text-right">
            <div class="text-xs text-secondary-text dark:text-secondary-text-d line-through" v-html="product.regularPrice"></div>
            <div class="font-bold text-[#d9000c] dark:text-[#ff0000]" v-html="product.salePrice"></div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
defineProps({
  products: Object,
});
</script>
