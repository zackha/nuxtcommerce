<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showThumbnails: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['openImageModal', 'update:modelValue']);

// IMAGE DATA
const allImages = computed(() => {
  if (!props.product?.image) return [];
  //todo return preview image?
  return [props.product.image, ...(props.product.galleryImages?.nodes || [])];
});

// CORE STATE
const currentIndex = ref(props.modelValue);
const containerOffset = ref(0);
const isDragging = ref(false);
const startDragX = ref(0);
const hasDragged = ref(false);

// ELEMENT REFS
const viewportRef = ref<HTMLDivElement | null>(null);
const slideRefs = ref<HTMLElement[]>([]);

// COMPUTED STYLES
const containerStyle = computed(() => ({
  transform: `translateX(${containerOffset.value}px)`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease-out',
}));

// FUNCTIONS
const calculateOffset = (targetIndex: number) => {
  if (!viewportRef.value || slideRefs.value.length === 0) return 0;
  const viewportWidth = viewportRef.value.offsetWidth;

  if (window.innerWidth < 1024) {
    return -(targetIndex * viewportWidth);
  }

  const targetSlide = slideRefs.value[targetIndex];
  if (!targetSlide) return 0;
  const targetSlideWidth = targetSlide.offsetWidth;

  let precedingSlidesWidth = 0;
  for (let i = 0; i < targetIndex; i++) {
    precedingSlidesWidth += slideRefs.value[i].offsetWidth;
    precedingSlidesWidth += 16;
  }

  return (viewportWidth / 2) - precedingSlidesWidth - (targetSlideWidth / 2);
};

const goToSlide = (index: number) => {
  const newIndex = Math.max(0, Math.min(allImages.value.length - 1, index));
  currentIndex.value = newIndex;
  emit('update:modelValue', newIndex);
  containerOffset.value = calculateOffset(newIndex);
};

const nextSlide = () => {
  if (currentIndex.value >= allImages.value.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex.value + 1);
  }
};

const prevSlide = () => {
  if (currentIndex.value <= 0) {
    goToSlide(allImages.value.length - 1);
  } else {
    goToSlide(currentIndex.value - 1);
  }
};

// DRAG / SWIPE HANDLERS
const onDragStart = (event: PointerEvent) => {
  isDragging.value = true;
  startDragX.value = event.clientX;
  hasDragged.value = false;
  event.preventDefault();
  document.body.style.cursor = 'grabbing';
};

const onDragMove = (event: PointerEvent) => {
  if (!isDragging.value) return;
  hasDragged.value = true;
  const currentX = event.clientX;
  const deltaX = currentX - startDragX.value;
  containerOffset.value = calculateOffset(currentIndex.value) + deltaX;
};

const onDragEnd = (event: PointerEvent) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  document.body.style.cursor = 'default';

  if (hasDragged.value) {
    const dragThreshold = 50;
    const dragDistance = event.clientX - startDragX.value;

    if (dragDistance < -dragThreshold) {
      nextSlide();
    } else if (dragDistance > dragThreshold) {
      prevSlide();
    } else {
      goToSlide(currentIndex.value);
    }
  } else {
    emit('openImageModal');
  }
};

// LIFECYCLE & WATCHERS
watch(() => props.modelValue, (newIndex) => {
  if (newIndex !== currentIndex.value) {
    goToSlide(newIndex);
  }
});

const handleResize = () => goToSlide(currentIndex.value);

onMounted(() => {
  nextTick(() => {
    goToSlide(currentIndex.value);
  });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <template v-if="showThumbnails">
    <div class="hidden lg:block w-16 max-h-[600px] overflow-y-auto space-y-2 pr-2">
      <div
          v-for="(image, i) in allImages"
          :key="`thumb-${i}`"
          @click="emit('update:modelValue', i)"
          class="cursor-pointer"
      >
        <NuxtImg
            :alt="product.name"
            class="w-full h-auto rounded-lg border-2"
            :class="modelValue === i ? 'border-neutral-900 dark:border-neutral-100' : 'border-transparent'"
            :src="image.sourceUrl"
        />
      </div>
    </div>
  </template>

  <template v-else-if="allImages.length > 0">
    <div class="relative w-full select-none p-1 lg:p-0">
      <div
          ref="viewportRef"
          class="h-auto lg:h-[530px] md:h-[600px] w-full lg:max-w-[1000px] mx-auto overflow-hidden cursor-grab rounded-xl"
          @pointerdown="onDragStart"
          @pointermove="onDragMove"
          @pointerup="onDragEnd"
          @pointerleave="onDragEnd"
      >
        <div class="flex items-center h-full" :style="containerStyle">
          <div
              v-for="(image, i) in allImages"
              :key="i"
              :ref="el => { if (el) slideRefs[i] = el as HTMLElement }"
              class="flex-shrink-0 w-full lg:w-auto h-full flex justify-center items-center lg:pr-4"
          >
            <NuxtImg
                :alt="product.name"
                :src="image.sourceUrl"
                class="w-full h-full lg:h-full lg:w-auto object-contain pointer-events-none p-1 lg:p-0 rounded-xl bg-black"
                loading="lazy"
            />
          </div>
        </div>
      </div>

      <div class="block">
        <button @click="prevSlide" class="nav-button left-0 cursor-pointer">
          <UIcon name="i-heroicons-chevron-left-20-solid" size="24"/>
        </button>

        <button @click="nextSlide" class="nav-button right-0 cursor-pointer">
          <UIcon name="i-heroicons-chevron-right-20-solid" size="24"/>
        </button>
      </div>

      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        <button
            v-for="(_, i) in allImages"
            :key="`dot-${i}`"
            @click="goToSlide(i)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentIndex === i ? 'bg-black scale-125' : 'bg-black/40'"
        ></button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 10;
}
.nav-button.left-0 {
  left: 1rem;
}
.nav-button.right-0 {
  right: 1rem;
}
</style>