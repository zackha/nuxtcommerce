<template>
  <div class="w-[calc(100vw-24px)] sm:w-96 h-96 p-3">
    <div
      class="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-100 via-white/0 to-white/0 dark:from-red-700/20 dark:via-black/0 dark:to-black/0 rounded-3xl w-full h-full flex items-center justify-center">
      <div class="flex flex-col items-center justify-center mt-2 mb-4 gap-2">
        <div class="bg-alizarin-crimson-500/20 dark:bg-alizarin-crimson-700/20 flex rounded-full p-5 mb-1">
          <UIcon name="i-iconamoon-shopping-bag-fill" size="46" class="text-alizarin-crimson-600 dark:text-alizarin-crimson-700 shadow-md" />
        </div>
        <div class="text-lg font-semibold">{{ $t('cart.empty') }}</div>
        <div class="text-sm text-neutral-500 dark:text-neutral-400 text-center">{{ $t('cart.notting_added') }}</div>
      </div>
    </div>
  </div>
</template>
