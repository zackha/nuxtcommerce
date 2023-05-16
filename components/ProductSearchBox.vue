<template>
  <div class="flex flex-shrink flex-grow flex-col text-sm font-semibold text-neutral-600 dark:text-neutral-200">
    <form
      class="group flex h-10 flex-grow rounded-xl border border-transparent bg-neutral-800/5 dark:bg-white/10 pl-4 pr-3 transition-all focus-within:border-neutral-400 focus-within:dark:border-neutral-600 focus-within:bg-white/30 focus-within:dark:bg-neutral-800/30 hover:border-neutral-300 hover:focus-within:border-neutral-400 hover:dark:border-neutral-600">
      <div class="flex w-full items-center gap-4">
        <div class="flex text-neutral-500 dark:text-neutral-400">
          <Icon name="majesticons:search-line" size="20" />
        </div>
        <div class="flex w-full">
          <input
            class="w-full bg-transparent py-2 outline-none placeholder:text-neutral-400 placeholder:dark:text-neutral-500"
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
