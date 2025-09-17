<script setup>
import {ref} from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Navigation, Pagination, Thumbs, FreeMode} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showThumbnails: {
    type: Boolean,
    default: false,
  },
  linkedSwiper: {
    type: Object,
    default: null,
  },
});

const allImages = computed(() => {
  if (!props.product?.image) return [];
  const originalImages = [props.product.image, ...(props.product.galleryImages?.nodes || [])];

  //todo remove after testing
  const test = true
  const imageMultiplier = 6;
  if (originalImages.length > 0 && test) {
    return Array.from({ length: imageMultiplier }).flatMap(() => originalImages);
  }

  return originalImages;
});

const emit = defineEmits(['openImageModal', 'swiper-instance']);

const handleSlideClick = () => {
  emit('openImageModal');
};

const modules = [Navigation, Pagination, Thumbs, FreeMode];
</script>


<template>
  <template v-if="showThumbnails">
    <swiper
        :modules="modules"
        @swiper="swiper => emit('swiper-instance', swiper)"
        direction="vertical"
        slidesPerView="auto"
        :freeMode="true"
        :watchSlidesProgress="true"
        class="product-images-thumbs w-14 max-h-[600px] hidden lg:block mr-4">
    >
      <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black" v-for="(image, i) in allImages" :key="i">
        <NuxtImg :alt="product.name" class="h-full w-full border-2 border-white bg-neutral-200 dark:bg-neutral-800 dark:border-black rounded-[10px]" :src="image.sourceUrl" />
      </swiper-slide>
    </swiper>
  </template>

  <template v-else>
    <swiper
        :style="{
      '--swiper-navigation-color': '#000',
      '--swiper-pagination-color': 'rgb(0 0 0 / 50%)',
    }"
        :spaceBetween="4"
        :loop="false"
        slidesPerView="auto"
        :centeredSlides="true"
        :pagination="{
          dynamicBullets: true,
        }"
        :navigation="true"
        :modules="modules"
        :thumbs="{ swiper: linkedSwiper }"
        class="max-w-[1000px] h-[450px] lg:h-[530px] xl:h-[600px] cursor-grab">
      <swiper-slide
          v-for="(image, i) in allImages"
          :key="i"
          @click="handleSlideClick"
          class="!w-auto">  <NuxtImg
          :alt="product.name"
          :src="image.sourceUrl"
          class="h-full w-auto rounded-xl"
          loading="lazy" />
      </swiper-slide>
    </swiper>
  </template>
</template>

<style lang="postcss">

</style>