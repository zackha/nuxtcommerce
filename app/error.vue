<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError
});

const { t } = useI18n();
const localePath = useLocalePath();
const isDev = import.meta.dev;

const handleError = () => clearError({ redirect: localePath('/') });

const is404 = computed(() => props.error?.statusCode === 404);

const errorTitle = computed(() =>
    is404.value ? t('error.not_found') : t('error.server_error')
);

const errorDescription = computed(() =>
    is404.value ? t('error.not_found_desc') : t('error.server_error_desc')
);
</script>

<template>
  <AppHeader />

  <main class="pt-[72px] lg:pt-20 min-h-[calc(100vh-72px)] flex flex-col items-center justify-center bg-white dark:bg-black px-4 text-center font-sans">

    <div class="w-32 h-32 bg-black/5 dark:bg-white/15 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
      <UIcon
          :name="is404 ? 'i-iconamoon-confused-face-light' : 'i-iconamoon-face-dizzy-light'"
          class="text-[#5f5f5f] dark:text-[#b7b7b7]"
          size="80"
      />
    </div>

    <div class="space-y-4 max-w-md mx-auto mb-10">
      <h1 class="text-6xl font-bold tracking-tighter text-black dark:text-white">
        {{ error?.statusCode }}
      </h1>
      <h2 class="text-2xl font-semibold text-[#111] dark:text-[#eee]">
        {{ errorTitle }}
      </h2>
      <p class="text-[#5f5f5f] dark:text-[#a3a3a3] leading-relaxed">
        {{ errorDescription }}
      </p>
    </div>

    <button
        @click="handleError"
        class="flex items-center gap-3 px-8 py-3 rounded-full font-semibold bg-black/5 dark:bg-white/15 hover:bg-black/10 hover:dark:bg-white/20 text-[#111] dark:text-[#eee] transition-all active:scale-95"
    >
      <UIcon name="i-iconamoon-arrow-left-2" size="20" />
      <span>{{ $t('general.go_back_home') }}</span>
    </button>

    <div v-if="isDev && !is404" class="mt-12 text-left w-full max-w-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-5 rounded-2xl overflow-auto max-h-60">
      <p class="font-mono text-xs text-red-600 dark:text-red-400 font-bold mb-2">DEVELOPER ERROR MESSAGE:</p>
      <pre class="font-mono text-xs text-red-800 dark:text-red-300 whitespace-pre-wrap">{{ error?.message }}</pre>
      <div v-if="error?.stack" class="mt-4 pt-4 border-t border-red-200 dark:border-red-900/30">
        <pre class="font-mono text-[10px] text-red-800/70 dark:text-red-300/70 whitespace-pre-wrap">{{ error.stack }}</pre>
      </div>
    </div>
  </main>

  <AppFooter />
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .8; }
}
</style>