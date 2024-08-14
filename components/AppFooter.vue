<script setup>
const config = useRuntimeConfig();
const colorMode = useColorMode();

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const colorModeIcon = computed(() => (colorMode.preference === 'dark' ? 'i-iconamoon-mode-dark-fill' : 'i-iconamoon-mode-light-fill'));
</script>

<template>
  <div class="my-5 flex items-center justify-between px-5 text-[13px] font-semibold text-secondary-text dark:text-secondary-text-d">
    <div>
      <a class="hover:text-black hover:dark:text-neutral-100" href="https://github.com/zackha/nuxtcommerce" target="_blank">NuxtCommerce v{{ config.public.version }}</a>
      - by
      <a class="hover:text-black hover:dark:text-neutral-100" href="https://zackha.com" target="_blank">Sefa Bulak</a>
    </div>
    <div>
      <button
        @click="toggleDark"
        class="box-border flex h-8 items-center gap-1.5 rounded-lg p-2 transition-all bg-neutral-800/5 hover:bg-neutral-800/10 hover:text-black active:scale-95 dark:bg-white/10 hover:dark:bg-white/20 hover:dark:text-neutral-100">
        <div class="flex"><UIcon :name="colorModeIcon" size="16" /></div>
        <div class="capitalize leading-3">{{ colorMode.preference }}</div>
      </button>
    </div>
  </div>
</template>
