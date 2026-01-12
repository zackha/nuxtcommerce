<script setup lang="ts">
const { isOpenImageSliderModal } = useComponents();

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  initialSlide: {
    type: Number,
    default: 0,
  },
});

const carouselRef = ref();

const images = computed(() => {
  const mainImage = props.product?.image?.sourceUrl ? [props.product.image.sourceUrl] : [];
  const additionalImages = props.product?.galleryImages?.nodes.map((image: any) => image.sourceUrl) || [];
  return mainImage.concat(additionalImages);
});

watch(
    () => isOpenImageSliderModal.value,
    (isOpen) => {
      if (isOpen) {
        setTimeout(() => {
          if (carouselRef.value) {
            carouselRef.value.select(props.initialSlide);
          }
        }, 50);
      }
    }
);
</script>

<template>
  <UModal
      v-model="isOpenImageSliderModal"
      :ui="{
      overlay: {
        background: 'bg-neutral-200/90 dark:bg-neutral-900/90 backdrop-blur-sm',
      },
      width: 'w-full sm:max-w-4xl',
      background: 'bg-transparent dark:bg-transparent',
      container: 'items-center',
      shadow: 'shadow-none',
    }">

    <button
        @click="isOpenImageSliderModal = false"
        class="flex p-2 absolute z-50 right-3 top-3 bg-white/50 hover:bg-white dark:bg-black/50 dark:hover:bg-black rounded-full items-center justify-center shadow transition backdrop-blur-sm">
      <UIcon name="i-iconamoon-close" class="text-black dark:text-white" size="20" />
    </button>

    <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="images"
        :ui="{
        item: 'basis-full flex justify-center items-center',
        container: 'rounded-3xl',
        indicators: {
            wrapper: 'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2',
            active: 'bg-alizarin-crimson-700 w-3',
            inactive: 'bg-gray-300 dark:bg-gray-700'
        }
      }"
        :prev-button="{
        color: 'gray',
        icon: 'i-iconamoon-arrow-left-2-duotone',
        class: 'bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black !rounded-full'
      }"
        :next-button="{
        color: 'gray',
        icon: 'i-iconamoon-arrow-right-2-duotone',
        class: 'bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black !rounded-full'
      }"
        class="w-full mx-auto"
        indicators
        arrows>

      <img
          :src="item"
          class="w-full h-full max-h-[85vh] object-contain select-none"
          draggable="false"
      />
    </UCarousel>
  </UModal>
</template>