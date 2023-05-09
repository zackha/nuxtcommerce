<template>
  <div v-for="i in 15" :key="i" class="p-2 border border-neutral-800 rounded-2xl animate-pulse">
    <div class="relative pb-[133%] mb-3">
      <div class="w-full h-full absolute rounded-lg bg-neutral-800"></div>
    </div>
    <div class="px-2 mb-1 grid grid-flow-row-dense grid-cols-3">
      <div class="flex flex-col min-w-0 justify-between gap-2 col-span-2">
        <div class="bg-neutral-800 w-2/4 h-8 rounded"></div>
        <div class="bg-neutral-800 w-full h-full rounded"></div>
      </div>
      <div class="gap-2 flex flex-col items-end">
        <div class="bg-neutral-800 w-2/3 h-8 rounded"></div>
        <div class="bg-neutral-800 w-3/4 h-full rounded"></div>
      </div>
    </div>
  </div>
</template>
