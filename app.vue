<template>
  <div class="flex">
    <div class="p-1 box-content w-[calc(100%+40px)] mx-auto max-w-[935px] grow">
      <div class="pb-1">
        <input
          type="text"
          v-model="variables.search"
          placeholder="Search"
          class="pl-1"
        >
      </div>
      <div class="grid gap-1 grid-cols-3">
        <div v-for="node in allProducts" :key="node.id" class="bg-neutral-200 dark:bg-neutral-800">
          <div class="relative pb-[133%] overflow-hidden">
            <NuxtImg
              loading="lazy"
              :title="node.name"
              :alt="node.image.altText || node.name"
              :src="node.image.sourceUrl"
              class="object-cover w-full h-full absolute"
            />
          </div>
        </div>
        <div v-if="loading" v-for="node in 9" :key="node" class="animate-pulse bg-neutral-200 dark:bg-neutral-800">
          <div class="relative pb-[133%] overflow-hidden"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getProducts from "~/gql/queries/getProducts.gql"
const variables = ref({
  search: ''
})
const { result, loading } = useQuery(getProducts, () => variables.value)
const allProducts = computed(() => result?.value?.products.nodes);
</script>

<style lang="postcss">
.dark-mode {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
</style>
