<template>
  <div v-for="i in 21" :key="i">
    <div class="rounded-2xl overflow-hidden w-full h-[313px] skeleton"></div>
    <div class="grid gap-1.5 pt-3 pb-4 px-1.5">
      <div class="h-4 w-20 rounded skeleton"></div>
      <div class="h-4 w-44 rounded skeleton"></div>
      <div class="h-4 w-28 rounded skeleton"></div>
    </div>
  </div>
</template>

<style lang="postcss">
.skeleton {
  @apply bg-neutral-200 relative overflow-hidden;
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #e5e5e5 8%, #f5f5f5 18%, #e5e5e5 33%);
    background-repeat: no-repeat;
    background-size: 400% 400%;
    animation: 1.5s shimmer linear infinite;
  }
}

.dark .skeleton {
  @apply bg-[#262626] relative overflow-hidden;
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #262626 8%, #141414 18%, #262626 33%);
    background-repeat: no-repeat;
    background-size: 400% 400%;
    animation: 1.5s shimmer linear infinite;
  }
}

@keyframes shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}
</style>
