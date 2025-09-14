<!--app/components/ButtonBack.vue-->
<script setup lang="ts">
const { t } = useI18n();
const router = useRouter();

const goBack = () => router.back();
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    goBack();
  }
};
</script>

<template>
  <div class="fixed px-7 mt-0.5 -left-1.5 max-2xl:hidden z-30">
    <UTooltip :text="t('general.go_back')" :open-delay="1500">
      <button
        type="button"
        class="flex p-3 rounded-full dark:bg-black hover:dark:bg-neutral-800 bg-white hover:bg-neutral-200 active:scale-95 transition"
        :aria-label="t('general.go_back')"
        @click="goBack"
        @keydown="onKey">
        <UIcon name="i-iconamoon-arrow-left-1-bold" size="24" />
      </button>
    </UTooltip>
  </div>
</template>
