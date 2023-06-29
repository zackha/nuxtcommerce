<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold" @click.stop="isDropdownVisible = !isDropdownVisible">
    <div class="box-border flex items-center rounded-full py-3.5 px-5 transition-all bg-[#efefef] hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
      <span class="mr-3">{{ route.query.category || 'All Categories' }}</span>
      <Icon name="ion:chevron-down-outline" size="14" />
    </div>
    <Transition>
      <div
        v-if="isDropdownVisible"
        id="dropdown"
        class="absolute left-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
        <div class="m-2 w-44">
          <div @click="setCategory()" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">All Categories</div>
              <Icon v-if="!route.query.category" name="mingcute:check-line" size="16" />
            </div>
          </div>
          <div
            v-for="(category, i) in categories"
            :key="i"
            @click="setCategory(category.name)"
            class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">{{ category.name }}</div>
              <Icon v-if="route.query.category === category.name" name="mingcute:check-line" size="16" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import getCategories from '~/gql/queries/getCategories.gql';

const isDropdownVisible = ref(false);
const router = useRouter();
const route = useRoute();
const activeCategory = ref(route.query.category);

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((category) => category.products.nodes.length && category.children.nodes.length));

const setCategory = (category) => {
  activeCategory.value = category;
  router.push({ query: { ...route.query, category: category } });
};

const hideDropdown = () => {
  isDropdownVisible.value = false;
};

const outsideClickHandler = (event) => {
  if (!event.target.closest('#dropdown')) {
    hideDropdown();
  }
};

onMounted(() => {
  window.addEventListener('click', outsideClickHandler);
});

onUnmounted(() => {
  window.removeEventListener('click', outsideClickHandler);
});
</script>
