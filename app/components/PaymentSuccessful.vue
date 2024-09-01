<script setup>
const { order } = useCheckout();
</script>

<template>
  <div class="w-[calc(100vw-24px)] sm:w-96 h-full rounded-3xl">
    <div class="flex flex-col items-center justify-center mb-6 mt-8 gap-1">
      <div class="bg-green-500/20 dark:bg-green-700/20 flex rounded-full p-3 mb-1">
        <UIcon name="i-iconamoon-check-circle-1-fill" size="46" class="text-[#23a26d] dark:text-[#40d195] shadow-md" />
      </div>
      <div class="text-lg font-semibold">Payment Success!</div>
      <div class="text-sm text-neutral-500 dark:text-neutral-300">Your payment was successful.</div>
    </div>
    <div class="bg-black/5 dark:bg-white/10 rounded-2xl p-5 m-5 gap-2 flex flex-col font-light text-sm capitalize">
      <div class="flex justify-between items-center">
        <span class="dark:text-neutral-400 text-neutral-600">Amount:</span>
        <span class="font-semibold text-lg">{{ order.total }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="dark:text-neutral-400 text-neutral-600">Order Number:</span>
        <span class="font-semibold">#{{ order.orderNumber }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="dark:text-neutral-400 text-neutral-600">Date:</span>
        <span class="font-semibold">{{ useDateFormat(order.date, 'MMMM DD, YYYY') }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="dark:text-neutral-400 text-neutral-600">Payment method:</span>
        <span class="font-semibold">{{ order.paymentMethodTitle }}</span>
      </div>
    </div>
  </div>
</template>
