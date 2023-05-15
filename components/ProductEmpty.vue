<template>
  <div class="p-6 text-center text-lg">
    <Icon name="majesticons:search-line" size="99"></Icon>
    <div class="py-4">
      <span v-if="cat">
        In the <strong>{{ cat }}</strong> category,
      </span>
      <span v-if="term">
        there are no items matching for: <strong>{{ term }}</strong>
      </span>
    </div>
    <div class="text-sm">Try improving your results by double checking your spelling or trying a more general keyword.</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cat: { type: String, default: null },
  term: { type: String, default: null },
});
</script>
