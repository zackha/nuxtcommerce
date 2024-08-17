<script setup>
defineProps({
  products: Object,
});
</script>

<template>
  <article v-for="product in products">
    <NuxtLink :to="`/product/${product.slug}-${product.sku.split('-')[0]}`" class="group select-none">
      <div class="cursor-pointer transition ease-[ease] duration-300">
        <div class="relative pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-2xl overflow-hidden">
          <NuxtImg
            :alt="product.name"
            loading="lazy"
            :title="product.name"
            :src="product.galleryImages.nodes[0].sourceUrl"
            class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover" />
          <NuxtImg
            :alt="product.name"
            loading="lazy"
            :title="product.name"
            :src="product.image.sourceUrl"
            class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        <div class="grid gap-0.5 pt-3 pb-4 px-1.5 text-sm font-semibold">
          <div class="flex gap-1">
            <div v-html="product.salePrice"></div>
            <div class="text-[#5f5f5f] dark:text-[#a3a3a3] line-through" v-html="product.regularPrice"></div>
          </div>
          <div>{{ product.name }}</div>
          <div class="font-normal text-[#5f5f5f] dark:text-[#a3a3a3]">
            {{ product.allPaStyle.nodes[0].name }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
