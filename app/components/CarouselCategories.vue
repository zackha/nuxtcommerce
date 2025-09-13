<script setup>
const router = useRouter();
const route = useRoute();

defineProps({
  categories: Array,
});

const cardsSlider = ref(null);
const showPrev = ref(false);
const showNext = ref(true);
const isDragging = ref(false);
const dragThreshold = 10;
let startX, scrollLeft;

const colors = ['bg-[#dad5ff]', 'bg-[#ffe2eb]', 'bg-[#ffe4c2]', 'bg-[#fffd92]', 'bg-[#cfffcb]', 'bg-[#dbfff6]', 'bg-[#d7edff]'];

const setCategory = category => {
  if (!isDragging.value && (route.query.category || '') !== category) {
    router.push({ query: { ...route.query, category: category || undefined } });
  }
};

const getCategoryClass = index => {
  return `${colors[index % colors.length]} hover:brightness-90`;
};

const initializeDrag = e => {
  isDragging.value = false;
  startX = e.pageX - cardsSlider.value.getBoundingClientRect().left;
  scrollLeft = cardsSlider.value.scrollLeft;
  document.addEventListener('mousemove', handleDragging);
  document.addEventListener('mouseup', endDrag);
};

const handleDragging = e => {
  const xPos = e.pageX - cardsSlider.value.getBoundingClientRect().left;
  const walk = (xPos - startX) * 1.5;
  cardsSlider.value.scrollLeft = scrollLeft - walk;
  isDragging.value = Math.abs(walk) > dragThreshold;
};

const endDrag = () => {
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', endDrag);
};

const updateButtonVisibility = () => {
  const { scrollLeft, scrollWidth, clientWidth } = cardsSlider.value;
  showPrev.value = scrollLeft > 16;
  showNext.value = scrollLeft < scrollWidth - clientWidth - 16;
};

onMounted(() => {
  cardsSlider.value.addEventListener('mousedown', initializeDrag);
  updateButtonVisibility();
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', endDrag);
});
</script>

<template>
  <div class="slider-container">
    <div v-if="showPrev" class="slider-btn prev-btn"></div>
    <div class="slider-wrapper">
      <div ref="cardsSlider" class="cards-slider" @scroll="updateButtonVisibility">
        <div
          @click="setCategory('')"
          :class="[
            'card ml-2 lg:ml-4 transition',
            !route.query.category ? 'selected' : 'bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-[#262626] hover:dark:bg-[#333] text-black dark:text-white',
          ]">
          <div class="px-3.5">{{ $t('filter.all_categories') }}</div>
        </div>
        <div
          v-for="(category, i) in categories"
          :key="category.id"
          @click="setCategory(category.name)"
          :class="['card text-black transition cat-button-bezel', route.query.category === category.name ? 'selected' : getCategoryClass(i)]">
          <NuxtImg
            :alt="category.name"
            loading="lazy"
            :src="category.image?.sourceUrl"
            class="w-[38px] h-[38px] rounded-full object-cover border border-transparent dark:bg-black/15 bg-white/30" />
          <div class="px-3.5">{{ category.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.cat-button-bezel {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
}
img {
  @apply pointer-events-none;
}

.selected {
  @apply bg-red-600 lg:hover:bg-red-700 text-white dark:bg-alizarin-crimson-700 lg:hover:dark:bg-alizarin-crimson-800;
}

.slider-container {
  @apply flex relative overflow-hidden items-center;
}

.slider-wrapper {
  @apply relative w-full overflow-hidden;
}

.cards-slider {
  @apply flex cursor-grab w-full overflow-auto gap-2 lg:gap-4 pr-3 lg:pr-4;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cards-slider::-webkit-scrollbar {
  display: none;
}

.cards-slider:active {
  cursor: grabbing;
}

.card {
  @apply cursor-pointer min-w-max select-none box-border flex items-center rounded-full p-1.5 transition-all;
  &:active {
    @apply cursor-grab scale-95;
  }
}

.slider-btn {
  @apply h-full w-14 cursor-pointer absolute top-0 z-10 flex items-center justify-center select-none;
}

.prev-btn {
  @apply left-0 bg-gradient-to-r from-white dark:from-black;
}

.next-btn {
  right: 0;
  background: #000;
}

.next-btn::before {
  position: absolute;
  content: '';
  right: 56px;
  width: 56px;
  height: 100%;
  background: linear-gradient(to left, rgb(0, 0, 0), transparent);
}

.slider-wrapper::before,
.slider-wrapper::after {
  @apply absolute h-full top-0 w-2 lg:w-4 z-10;
  content: '';
  pointer-events: none;
}

.slider-wrapper::before {
  @apply left-0 bg-gradient-to-r from-white dark:from-black;
}
</style>
