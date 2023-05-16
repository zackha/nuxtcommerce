<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
.dark {
  @apply bg-black text-neutral-100;
  color-scheme: dark;
}
.v-enter-active {
  @apply transition duration-200 ease-out;
}
.v-enter-from,
.v-leave-to {
  @apply translate-y-5 opacity-0;
}
.v-enter-to,
.v-leave-from {
  @apply transform opacity-100;
}
.v-leave-active {
  @apply transition duration-150 ease-in;
}
</style>
