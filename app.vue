<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1 text-right">
        <select v-model="$colorMode.preference">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
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
const colorMode = useColorMode()
console.log(colorMode.preference)
</script>

<style lang="postcss">
.dark-mode body {
  @apply bg-black;
}
</style>
