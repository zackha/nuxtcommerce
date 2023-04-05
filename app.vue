<template>
  <div class="flex">
    <div class="px-5 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="grid gap-1 grid-cols-3 grid-rows-3">
        <div v-for="(node, i) in products?.nodes" :key="i" :index="i">
          <NuxtImg :src="node?.image?.sourceUrl" format="webp" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { products } = await GqlGetProducts()
</script>
