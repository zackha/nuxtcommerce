<script setup>
const { cart, handleRemoveFromCart, removeFromCartButtonStatus } = useCart();
const { order } = useCheckout();
</script>

<template>
  <div
    class="select-none mx-3 lg:mx-5 shadow-2xl mt-20 rounded-[2rem] right-0 fixed flex z-50 bg-white/85 dark:bg-black/85 dark:border dark:border-white/10 cart-button-bezel backdrop-blur-lg overflow-hidden">
    <Transition name="fade" mode="out-in">
      <PaymentSuccessful v-if="order?.orderNumber && !cart.length" />
      <div v-else-if="cart.length" class="flex w-full h-full max-md:flex-col max-md:max-h-[calc(100vh-92px)] max-md:overflow-auto">
        <div class="w-[calc(100vw-24px)] sm:w-full md:w-80 relative">
          <div class="md:absolute h-full w-full overflow-auto">
            <div
              v-for="product in cart.slice().reverse()"
              :key="product.key"
              class="flex bg-black/5 dark:bg-white/10 m-3 p-3 gap-3 rounded-3xl items-center group relative max-md:pr-9">
              <NuxtImg :src="product.variation.node.image.sourceUrl" class="w-24 h-28 object-cover shadow-md rounded-2xl" />
              <div class="flex-1 gap-1 flex flex-col">
                <div class="font-medium text-sm line-clamp-2 overflow-hidden text-ellipsis">{{ product.product.node.name }}</div>
                <div class="font-bold">${{ Number(product.variation.node.salePrice).toFixed(2) }}</div>
                <div class="flex-wrap text-neutral-600 dark:text-neutral-300 items-baseline text-xs gap-1 flex-row flex">
                  <p>Originally:</p>
                  <p class="line-through">${{ Number(product.variation.node.regularPrice).toFixed(2) }}</p>
                  <p class="text-alizarin-crimson-700">-{{ ((1 - product.variation.node.salePrice / product.variation.node.regularPrice) * 100).toFixed(0) }}%</p>
                </div>
                <div class="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Size: {{ product.variation.attributes.map(attr => attr.value.toUpperCase()).join(', ') }} • Qty: {{ product.quantity }}
                </div>
              </div>
              <button
                @click="handleRemoveFromCart(product.key)"
                class="absolute md:opacity-0 group-hover:opacity-100 top-2 right-2 md:-top-1 md:-right-1 transition bg-red-700 flex p-1 items-center justify-center rounded-full hover:bg-red-500 active:scale-95">
                <UIcon :name="removeFromCartButtonStatus === 'remove' ? 'i-iconamoon-trash-light' : 'i-svg-spinners-90-ring-with-bg'" size="18" class="text-white" />
              </button>
            </div>
          </div>
        </div>
        <Checkout />
      </div>
      <EmptyCart v-else />
    </Transition>
  </div>
</template>

<style lang="postcss">
.cart-button-bezel {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
</style>
