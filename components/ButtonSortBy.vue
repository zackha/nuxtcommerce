<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold">
    <div class="box-border flex items-center rounded-full py-3.5 px-5 transition-all bg-[#efefef] hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
      <span class="mr-3">{{ selectedOption }}</span>
      <Icon name="ion:chevron-down-outline" size="14" />
    </div>
    <Transition>
      <div
        v-show="show"
        class="absolute right-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
        <div class="m-2 w-44">
          <div
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option.value)"
            class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">{{ option.value }}</div>
              <Icon v-if="selectedOption === option.value" name="mingcute:check-line" size="16" />
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
  options: Array,
  selectedOption: String,
});

const emit = defineEmits(['update:selectedOption']);

const selectOption = (option) => {
  emit('update:selectedOption', option);
};
</script>
