<script setup>
const categoriesData = ref([]);

onMounted(async () => {
  const response = await listCategories();
  categoriesData.value = response.productCategories.nodes.filter(category => category.products.nodes.length && category.children.nodes.length);
});

const categories = computed(() => categoriesData.value);
</script>

<template>
  <div class="slider-container ml-4 gap-4" v-if="categories.length">
    <div class="h-[50px] min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton"></div>
    <div class="h-[50px] relative min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-60 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-40 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
    <div class="h-[50px] relative min-w-44 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex">
      <div class="w-10 h-10 absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div>
    </div>
  </div>
  <CarouselCategories v-else :categories="categories" />
</template>
