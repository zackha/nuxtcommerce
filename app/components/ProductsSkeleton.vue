<template>
  <div v-for="i in 21" :key="i">
    <div class="rounded-2xl overflow-hidden w-full pb-[133%] bg-neutral-200 dark:bg-neutral-800 skeleton"></div>
    <div class="grid gap-1.5 pt-3 pb-4 px-1.5">
      <div class="h-4 w-20 rounded bg-neutral-200/80 dark:bg-neutral-800/80 skeleton"></div>
      <div class="h-4 w-44 rounded bg-neutral-200/60 dark:bg-neutral-800/60 skeleton"></div>
      <div class="h-4 w-28 rounded bg-neutral-200/40 dark:bg-neutral-800/40 skeleton"></div>
    </div>
  </div>
</template>

<style lang="postcss">
.dark .skeleton {
  --skeleton-bg: #141414;
}

.skeleton {
  --skeleton-bg: #f5f5f5;
}

.skeleton {
  @apply relative overflow-hidden;
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, rgba(0, 0, 0, 0) 25%, var(--skeleton-bg) 50%, rgba(0, 0, 0, 0) 75%);
    background-size: 400% 100%;
    animation: shimmer 4s infinite linear;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
