<script setup>
const { cart } = useCart();

const userDetails = ref({ email: '', firstName: '', lastName: '', phone: '', city: '', address1: '' });

const isProcessing = ref(false);
const buttonText = ref('order');

const handleCheckout = async () => {
  isProcessing.value = true;
  buttonText.value = 'processing';
  const checkoutData = {
    billing: { ...userDetails.value },
    paymentMethod: 'cod',
  };

  await checkout(checkoutData).then(() => {
    cart.value = [];
    localStorage.setItem('cart', JSON.stringify(cart.value));
    buttonText.value = 'completed';
    isProcessing.value = false;
  });
};
</script>

<template>
  <div class="w-96 h-full bg-black/5 dark:bg-white/10 my-3 mr-3 p-3 rounded-3xl">
    <Transition name="fade" mode="out-in">
      <div v-if="buttonText !== 'completed'">
        <div class="text-xl font-bold px-2 mb-3">Checkout</div>
        <form @submit.prevent="handleCheckout" class="flex flex-col items-center justify-center">
          <div class="grid grid-cols-2 gap-3">
            <div class="col-span-full">
              <input
                v-model="userDetails.email"
                placeholder="Email address"
                id="email"
                name="email"
                type="email"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
            </div>
            <div class="col-span-1">
              <input
                v-model="userDetails.firstName"
                placeholder="First name"
                id="first-name"
                name="first-name"
                type="text"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
            </div>
            <div class="col-span-1">
              <input
                v-model="userDetails.lastName"
                placeholder="Last name"
                id="last-name"
                name="last-name"
                type="text"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
            </div>
            <div class="col-span-1">
              <input
                v-model="userDetails.phone"
                placeholder="Phone number"
                id="phone"
                name="phone"
                type="text"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
            </div>
            <div class="col-span-1">
              <input
                v-model="userDetails.city"
                placeholder="City"
                id="city"
                name="city"
                type="text"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black" />
            </div>
            <div class="col-span-full">
              <textarea
                v-model="userDetails.address1"
                placeholder="Address"
                id="address"
                name="address"
                rows="2"
                class="block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black"></textarea>
            </div>
          </div>
          <div class="text-sm font-semibold p-4 text-neutral-600 dark:text-neutral-400">Paying a total of $215 for 4 products.</div>
          <button
            type="submit"
            :disabled="buttonText !== 'order'"
            class="pay-button-bezel w-full h-12 rounded-xl relative font-semibold text-white dark:text-black text-lg flex justify-center items-center">
            <Transition name="slide-up">
              <div v-if="buttonText === 'order'" class="absolute">Pay $215</div>
              <UIcon v-else-if="buttonText === 'processing'" class="absolute" name="i-svg-spinners-90-ring-with-bg" size="22" />
            </Transition>
          </button>
          <div class="text-xs font-medium p-4 flex gap-1 items-end text-neutral-400 dark:text-neutral-600">
            <UIcon name="i-iconamoon-lock-fill" size="18" />
            <div>Your payment is secured by Stripe</div>
          </div>
        </form>
      </div>
      <PaymentSuccessful v-else />
    </Transition>
  </div>
</template>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
textarea {
  resize: none;
}
.pay-button-bezel {
  box-shadow: 0 0 0 var(--button-outline, 0px) rgba(92, 222, 131, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 1px 1px 0 rgba(0, 0, 0, 0.3);
  @apply bg-[#23a26d] dark:bg-[#40d195] outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;
  &:hover {
    @apply brightness-110;
  }
  &:active {
    --button-outline: 4px;
    --button-scale: 0.975;
  }
}
</style>
