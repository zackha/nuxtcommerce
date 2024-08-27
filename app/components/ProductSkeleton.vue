<template>
  <div class="justify-center flex flex-col lg:flex-row lg:mx-5">
    <ButtonBack />
    <div class="mr-6 mt-5 pt-2.5 gap-3 flex flex-col max-xl:hidden">
      <div class="h-20 w-14 p-1 relative" v-for="i in 6" :key="i">
        <div class="skeleton bg-neutral-200/70 dark:bg-neutral-800/80 w-full h-full rounded-lg"></div>
      </div>
    </div>
    <div
      class="flex lg:p-5 lg:gap-5 flex-col w-full lg:w-[1110px] lg:flex-row lg:border lg:border-transparent lg:dark:border-[#262626] lg:rounded-[32px] lg:shadow-[0_1px_20px_rgba(0,0,0,.15)] lg:mt-2.5">
      <div class="w-[600px] h-[600px] max-lg:hidden">
        <div class="items-center overflow-hidden flex flex-row rounded-2xl">
          <div class="flex flex-row">
            <div v-for="i in 2" :key="i" class="w-[400px] h-[600px] mr-1 relative">
              <div class="skeleton bg-neutral-200/70 dark:bg-neutral-800/80 w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full max-lg:h-72 flex flex-row items-center justify-center">
        <div class="bg-neutral-200 dark:bg-neutral-800 flex rounded-full w-12 h-12 items-center justify-center skeleton">
          <UIcon class="text-white dark:text-black" name="i-svg-spinners-8-dots-rotate" size="26" />
        </div>
      </div>
    </div>
  </div>
</template>
