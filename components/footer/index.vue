<template>
  <button @click="toggleDark" class="box-border flex h-8 items-center rounded-lg p-2 transition-all active:scale-95 dark:bg-white/10 hover:dark:bg-white/20">
    <Icon :name="colorModeIcon" size="16"></Icon>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const colorModeIcon = computed(() => (colorMode.preference === 'dark' ? 'solar:moon-bold' : 'solar:sun-bold'));
</script>
