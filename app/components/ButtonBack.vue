<template>
  <div class="fixed px-7 mt-0.5 -left-1.5 max-2xl:hidden z-30">
    <UTooltip :text="$t('general.go_back')" :open-delay="1500">
      <button @click.prevent="useRouter().back()" class="flex p-3 rounded-full dark:bg-black hover:dark:bg-neutral-800 bg-white hover:bg-neutral-200 active:scale-95 transition">
        <UIcon name="i-iconamoon-arrow-left-1-bold" size="24" />
      </button>
    </UTooltip>
  </div>
</template>
