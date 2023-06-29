<template>
  <div v-for="i in 21" :key="i" class="animate-pulse rounded-2xl border dark:bg-secondary-bg-d px-4 pt-4 pb-3 dark:border-[#222222]">
    <div class="relative mb-4 pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-lg overflow-hidden">
      <div class="absolute h-full w-full bg-neutral-200 dark:bg-neutral-800"></div>
    </div>
    <div class="mb-1 grid grid-flow-row-dense grid-cols-3 px-2">
      <div class="col-span-2 flex min-w-0 flex-col justify-between gap-2">
        <div class="h-8 w-2/4 rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div class="h-full w-full rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <div class="h-8 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div class="h-full w-3/4 rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    </div>
  </div>
</template>
