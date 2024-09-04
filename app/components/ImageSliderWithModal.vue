<script setup lang="ts">
const { isOpenImageSliderModal } = useComponents();
const props = defineProps({
  product: Object,
});

const images = computed(() => {
  const mainImage = props.product?.image?.sourceUrl ? [props.product.image.sourceUrl] : [];
  const additionalImages = props.product?.galleryImages?.nodes.map((image: any) => image.sourceUrl) || [];
  return mainImage.concat(additionalImages);
});
</script>

<template>
  <UModal
    :ui="{
      overlay: {
        background: 'bg-neutral-200/90 dark:bg-neutral-800/90 backdrop-blur-sm',
      },
      background: 'bg-bg-transparent dark:bg-bg-transparent',
      container: 'items-center',
      shadow: 'shadow-none',
    }">
    <div
      @click="isOpenImageSliderModal = false"
      class="flex p-2 absolute z-50 right-3 top-3 bg-white/50 hover:bg-white rounded-full items-center justify-center shadow transition backdrop-blur-sm">
      <UIcon name="i-iconamoon-close" class="text-black" size="16" />
    </div>
    <UCarousel
      :items="images"
      :ui="{
        item: 'basis-full',
        container: 'rounded-3xl',
        indicators: {
          wrapper: 'relative bottom-0 mt-4',
        },
      }"
      class="w-full mx-auto"
      indicators>
      <template #default="{ item }">
        <img :src="item" class="w-full select-none" draggable="false" />
      </template>
      <template #indicator="{ onClick, page, active }">
        <UButton :label="String(page)" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-6 justify-center" @click="onClick(page)" />
      </template>
    </UCarousel>
  </UModal>
</template>
