<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

interface Image {
  sourceUrl: string;
}

interface Product {
  name: string;
  image?: Image;
  galleryImages?: {
    nodes: Image[];
  };
}

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  initialIndex: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['update:modelValue']);

const allImages = computed(() => {
  if (!props.product?.image) return [];
  return [props.product.image, ...(props.product.galleryImages?.nodes || [])];
});

const currentImageUrl = computed(() => {
  return allImages.value[props.initialIndex]?.sourceUrl || '';
});

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <UModal
      v-model="isOpen"
      :ui="{
        width: 'w-full',
        height: 'h-full',
        container: 'items-center justify-center p-4',
        overlay: {
          background: 'bg-neutral-200/90 dark:bg-neutral-800/90 backdrop-blur-sm'
        }
      }"
      :fullscreen="false"
  >
    <UButton
        icon="i-heroicons-x-mark-20-solid"
        color="white"
        variant="soft"
        class="!absolute top-4 right-4 z-20"
        :ui="{ rounded: 'rounded-full' }"
        @click="isOpen = false"
    />

    <div v-if="currentImageUrl" class="flex items-center justify-center h-full w-full">
      <NuxtImg
          :src="currentImageUrl"
          :alt="product.name"
          class="object-contain w-auto h-auto max-w-full max-h-[90vh] rounded-lg select-none"
          draggable="false"
      />
    </div>
  </UModal>
</template>