<template>
  <div v-for="i in 9" :key="i" class="animate-pulse rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2">
    <div class="relative mb-3 pb-[133%]">
      <div class="absolute h-full w-full rounded-lg bg-neutral-200 dark:bg-neutral-800"></div>
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
