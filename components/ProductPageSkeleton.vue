<template>
  <div class="animate-pulse justify-center flex flex-row pt-20">
    <div class="mr-6 mt-5 gap-4 flex flex-col pt-2.5">
      <div class="h-[76px] w-[56px] rounded-xl border-2 border-neutral-200 bg-neutral-200" v-for="node in 6">
        <div class="h-full w-full border-2 border-white rounded-[10px]"></div>
      </div>
    </div>
    <div class="flex p-5 flex-row gap-6 w-3/5 border border-transparent bg-white dark:border-[#262626] rounded-[32px] shadow-[0_1px_20px_rgba(0,0,0,.1)] mt-2.5">
      <div class="relative">
        <div class="w-[600px] h-[600px]">
          <div class="rounded-2xl h-full w-full bg-neutral-200 dark:bg-neutral-800"></div>
        </div>
      </div>
      <div class="w-full flex flex-row items-center">
        <Icon class="my-0 mx-auto" name="Loading" size="26" />
      </div>
    </div>
  </div>
</template>
