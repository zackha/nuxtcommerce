<template>
  <div class="animate-pulse justify-center flex flex-row">
    <div class="flex p-5 flex-row gap-6 w-3/5 border border-[#333] mt-10 mb-10 rounded-[32px]">
      <div class="relative">
        <div class="w-[400px] h-[600px]">
          <div class="rounded-2xl border border-[#333] absolute h-full w-full bg-neutral-800"></div>
          <div class="bullets-wrapper-skeleton border border-[#333]">
            <div class="bullets-container-skeleton relative gap-2">
              <div class="w-6 rounded-sm h-9 bg-[#333]" v-for="i in 6" :key="i"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex-col flex gap-4">
          <div class="pb-3 border-b border-[#333]">
            <div class="h-8 w-80 bg-neutral-800 mb-2 rounded"></div>
            <div class="flex justify-between flex-row items-baseline">
              <div class="flex flex-row items-baseline">
                <div class="h-5 w-44 bg-neutral-800 mb-1 rounded"></div>
              </div>
            </div>
            <div class="flex-wrap items-baseline flex-row flex">
              <div class="h-5 w-40 bg-neutral-800 mb-1 rounded"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="rounded-md border border-[#333] w-12 h-[71px] bg-neutral-800" v-for="i in 2" :key="i"></div>
          </div>
          <div class="pb-4 border-b border-[#333]">
            <div class="h-5 w-14 bg-neutral-800 mb-2 rounded"></div>
            <div class="flex gap-2 mt-2 mb-4 flex-wrap">
              <div class="py-1 px-3 border w-12 h-[34px] rounded-md border-[#333] bg-neutral-800" v-for="i in 5" :key="i"></div>
            </div>
            <div class="flex">
              <div class="w-full h-12 border rounded-md border-[#333] bg-neutral-800"></div>
              <div>
                <div class="w-12 h-12 rounded-md border ml-4 border-[#333] bg-neutral-800"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="bg-neutral-800 h-6 rounded w-44 mb-3"></div>
            <div class="bg-neutral-800 h-5 rounded w-96 mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-80 mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-28 mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-40 mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-32 mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-full mb-2"></div>
            <div class="bg-neutral-800 h-5 rounded w-64"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.bullets-wrapper-skeleton {
  @apply p-2 rounded-xl absolute left-1/2 bottom-2 -translate-x-1/2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
.bullets-wrapper-skeleton .bullets-container-skeleton {
  @apply flex justify-center overflow-hidden items-center rounded-md;
}
</style>
