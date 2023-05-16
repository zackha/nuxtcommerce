<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-sm font-semibold">
    <div
      class="box-border flex h-10 items-center rounded-xl py-1.5 pl-4 pr-3 transition-all bg-neutral-800/5 hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
      <span class="mr-3">{{ selectedCategory || 'All Categories' }}</span>
      <Icon name="ion:chevron-down-outline" size="14" />
    </div>
    <Transition>
      <div
        v-show="show"
        class="absolute left-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
        <div class="m-2 w-44">
          <div @click="selectCategory('')" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">All Categories</div>
              <Icon v-if="selectedCategory === ''" name="mingcute:check-line" size="16" />
            </div>
          </div>
          <div
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.name)"
            class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">{{ category.name }}</div>
              <Icon v-if="selectedCategory === category.name" name="mingcute:check-line" size="16" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  categories: Array,
  selectedCategory: String,
});

const emit = defineEmits(['update:selectedCategory']);

const selectCategory = (category) => {
  emit('update:selectedCategory', category);
};
</script>
