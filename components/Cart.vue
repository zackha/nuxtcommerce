<template>
  <div
    class="select-none mt-[100px] mx-5 shadow-2xl rounded-[2rem] right-0 fixed flex z-50 bg-white/85 dark:bg-black/85 dark:border dark:border-white/10 cart-button-bezel backdrop-blur-lg overflow-hidden">
    <div class="w-80 relative">
      <div class="absolute h-full w-full overflow-auto">
        <div v-for="i in 1" :key="i" class="flex bg-black/5 dark:bg-white/10 m-3 p-3 rounded-3xl overflow-hidden items-center">
          <img src="https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/7803315-615-1-300x450.jpg" class="w-24 h-24 object-cover shadow-md rounded-2xl" />
          <div class="flex-1 px-3 gap-1 flex flex-col">
            <div class="font-semibold text-sm">Striped triangle bikini top Orange</div>
            <div class="text-xs font-medium text-neutral-600 dark:text-neutral-400">Size: XL • Qty: 1</div>
            <div class="font-bold">$27.90</div>
          </div>
        </div>
      </div>
    </div>
    <Checkout />
  </div>
</template>

<style lang="postcss">
.cart-button-bezel {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
</style>
