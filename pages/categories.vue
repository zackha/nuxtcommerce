<template>
  <div v-for="(category, i) in categories" :key="i">
    <NuxtImg v-if="category.image" :src="category.image.sourceUrl" loading="lazy" :title="category.name" />
  </div>
</template>
<script setup>
import getCategories from '~/gql/queries/getCategories.gql';

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((category) => category.products.nodes.length && category.children.nodes.length));
</script>
