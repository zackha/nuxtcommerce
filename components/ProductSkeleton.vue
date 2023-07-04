<template>
  <div class="justify-center flex flex-row mb-8">
    <div class="mr-6 mt-5 gap-4 flex flex-col pt-2.5">
      <div class="h-[76px] w-[56px] rounded-xl border-2 border-[#e5e5e5] dark:border-[#262626] relative overflow-hidden" v-for="i in 6" :key="i">
        <div class="skeleton-thumb"></div>
      </div>
    </div>
    <div class="flex p-5 flex-row gap-6 w-3/5 border border-transparent dark:border-[#262626] rounded-[32px] shadow-[0_1px_20px_rgba(0,0,0,.1)] mt-2.5">
      <div class="w-[600px] h-[600px]">
        <div class="items-center overflow-hidden flex flex-row rounded-2xl">
          <div class="flex flex-row">
            <div v-for="i in 2" :key="i" class="w-[400px] h-[600px] mr-1 relative">
              <div class="skeleton-product"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row items-center">
        <Icon class="my-0 mx-auto" name="Loading" size="26" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.skeleton-thumb {
  @apply h-full w-full bg-[#e5e5e5];
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #e5e5e5 8%, #f5f5f5 18%, #e5e5e5 33%);
    background-repeat: no-repeat;
    background-size: 600%;
    animation: 1.5s shimmer-product linear infinite;
    border: 2px solid #fff;
    border-radius: 10px;
  }
}

.dark .skeleton-thumb {
  @apply h-full w-full bg-[#262626];
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #262626 8%, #141414 18%, #262626 33%);
    background-repeat: no-repeat;
    background-size: 600%;
    animation: 1.5s shimmer-product linear infinite;
    border: 2px solid #000;
    border-radius: 10px;
  }
}

.skeleton-product {
  @apply h-full w-full bg-[#e5e5e5];
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #e5e5e5 8%, #f5f5f5 18%, #e5e5e5 33%);
    background-repeat: no-repeat;
    background-size: 600%;
    animation: 1.5s shimmer-product linear infinite;
  }
}

.dark .skeleton-product {
  @apply h-full w-full bg-[#262626];
  &:before {
    @apply absolute w-full h-full;
    content: '';
    background: linear-gradient(110deg, #262626 8%, #141414 18%, #262626 33%);
    background-repeat: no-repeat;
    background-size: 600%;
    animation: 1.5s shimmer-product linear infinite;
  }
}

@keyframes shimmer-product {
  0% {
    background-position: 40%;
  }
  100% {
    background-position: -40%;
  }
}
</style>
