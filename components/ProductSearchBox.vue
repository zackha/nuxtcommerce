<template>
  <div class="flex flex-shrink flex-grow flex-col text-sm font-semibold text-neutral-600 px-2">
    <form class="group flex h-12 flex-grow rounded-full bg-[#e9e9e9] pl-4 pr-3 transition-all hover:bg-[#e1e1e1]">
      <div class="flex w-full items-center gap-4">
        <div class="flex text-neutral-500 dark:text-neutral-400">
          <Icon name="iconamoon:search-bold" size="20" />
        </div>
        <div class="flex w-full">
          <input
            class="w-full bg-transparent py-2 outline-none placeholder:text-[#757575] placeholder:dark:text-neutral-500"
            :value="searchTerm"
            @input="updateSearchTerm"
            :placeholder="selectedCategory ? `Search in ${selectedCategory}` : 'Search'" />
        </div>
        <div v-if="searchTerm" @click="clearSearchTerm" class="flex cursor-pointer text-neutral-300 dark:text-neutral-500 transition-all">
          <Icon v-if="!loading" name="solar:close-square-bold" size="24" />
          <Icon v-else name="Loading" size="20" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  searchTerm: String,
  selectedCategory: String,
  loading: Boolean,
});

const emits = defineEmits(['update:searchTerm']);

const updateSearchTerm = ({ target: { value } }) => {
  emits('update:searchTerm', value);
};

const clearSearchTerm = () => {
  emits('update:searchTerm', '');
};
</script>
