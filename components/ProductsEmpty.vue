<template>
  <div class="p-6 text-center text-lg">
    <Icon name="iconamoon:search-bold" size="99"></Icon>
    <div class="py-4">
      <span v-if="route.query.category">
        In the <strong>{{ route.query.category }}</strong> category,
      </span>
      <span v-if="route.query.q">
        there are no items matching for: <strong>{{ route.query.q }}</strong>
      </span>
    </div>
    <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
  </div>
</template>

<script setup>
const route = useRoute();
</script>
