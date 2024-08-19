<script setup>
const empty = ref(false);
const products = ref([
  {
    id: 1,
    name: 'Striped triangle bikini top Orange',
    price: 27.9,
    originalPrice: 35.9,
    discount: 22,
    size: 'XL',
    quantity: 1,
    imageUrl: 'https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/7803315-615-1-300x450.jpg',
  },
  {
    id: 2,
    name: 'Printed tulle halter top Print',
    price: 45.5,
    originalPrice: 59.0,
    discount: 23,
    size: 'M',
    quantity: 1,
    imageUrl: 'https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/7244374-120-1-300x450.jpg',
  },
  {
    id: 3,
    name: 'Gathered lace camisole top Raspberry',
    price: 65.0,
    originalPrice: 80.0,
    discount: 19,
    size: '42',
    quantity: 1,
    imageUrl: 'https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/7234380-671-1-300x450.jpg',
  },
  {
    id: 4,
    name: 'Chicago hoodie Burgundy',
    price: 120.0,
    originalPrice: 150.0,
    discount: 20,
    size: 'L',
    quantity: 1,
    imageUrl: 'https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/3590311-681-1-300x450.jpg',
  },
  {
    id: 5,
    name: 'Rustic Oversized Shirt Red',
    price: 50.0,
    originalPrice: 65.0,
    discount: 23,
    size: '32',
    quantity: 1,
    imageUrl: 'https://nuxtcommerce.zackha.com/wp-content/uploads/2024/08/4471308-600-1-300x450.jpg',
  },
]);
</script>

<template>
  <div
    class="select-none mx-5 shadow-2xl mt-20 rounded-[2rem] right-0 fixed flex z-50 bg-white/85 dark:bg-black/85 dark:border dark:border-white/10 cart-button-bezel backdrop-blur-lg overflow-hidden">
    <EmptyCart v-if="empty" />
    <div v-else class="flex w-full h-full">
      <div class="w-80 relative">
        <div class="absolute h-full w-full overflow-auto">
          <div v-for="product in products" :key="product.id" class="flex bg-black/5 dark:bg-white/10 m-3 p-3 gap-3 rounded-3xl overflow-hidden items-center">
            <img :src="product.imageUrl" class="w-24 h-28 object-cover shadow-md rounded-2xl" />
            <div class="flex-1 gap-1 flex flex-col">
              <div class="font-medium text-sm line-clamp-2 overflow-hidden text-ellipsis">{{ product.name }}</div>
              <div class="font-bold">${{ product.price.toFixed(2) }}</div>
              <div class="flex-wrap text-neutral-600 dark:text-neutral-300 items-baseline text-xs gap-1 flex-row flex">
                <p>Originally:</p>
                <p class="line-through">${{ product.originalPrice.toFixed(2) }}</p>
                <p class="text-alizarin-crimson-700">-{{ product.discount }}%</p>
              </div>
              <div class="text-xs font-medium text-neutral-600 dark:text-neutral-300">Size: {{ product.size }} • Qty: {{ product.quantity }}</div>
            </div>
          </div>
        </div>
      </div>
      <Checkout />
    </div>
  </div>
</template>

<style lang="postcss">
.cart-button-bezel {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
</style>
