<template>
  <div class="p-6 text-center text-lg">
    <Icon name="majesticons:search-line" size="99"></Icon>
    <div class="py-4">
      <span v-if="selectedCategory">
        In the <strong>{{ selectedCategory }}</strong> category,
      </span>
      <span v-if="searchTerm">
        there are no items matching for: <strong>{{ searchTerm }}</strong>
      </span>
    </div>
    <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
  </div>
</template>

<script setup>
defineProps({
  selectedCategory: String,
  searchTerm: String,
});
</script>
