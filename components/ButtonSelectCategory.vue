<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold" ref="dropdownRef" @click="isDropdownVisible = !isDropdownVisible">
    <div
      class="box-border flex items-center rounded-full py-3.5 pl-5 pr-4 transition-all active:scale-95"
      :class="{ 'bg-black text-white hover:bg-black': isDropdownVisible, 'bg-[#efefef] hover:bg-[#e2e2e2]': !isDropdownVisible }">
      <span class="mr-1.5">{{ route.query.category || 'All Categories' }}</span>
      <Icon name="iconamoon:arrow-down-2" size="24" />
    </div>
    <Transition>
      <div v-if="isDropdownVisible" class="absolute top-full z-10 mt-[18px] rounded-2xl text-base font-semibold bg-white shadow-[0_0_8px_rgba(0,0,0,.1)]">
        <div class="m-2 w-44">
          <div @click="setCategory()" class="rounded-[10px] px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9]">
            <div class="flex items-center justify-between">
              <div class="mr-1 w-full">All Categories</div>
              <Icon v-if="!route.query.category" name="iconamoon:check-bold" size="20" />
            </div>
          </div>
          <div v-for="(category, i) in categories" :key="i" @click="setCategory(category.name)" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9]">
            <div class="flex items-center justify-between">
              <div class="mr-1 w-full">{{ category.name }}</div>
              <Icon v-if="route.query.category === category.name" name="iconamoon:check-bold" size="20" />
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
const dropdownRef = ref(null);
const router = useRouter();
const route = useRoute();
const activeCategory = ref(route.query.category);

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((category) => category.products.nodes.length && category.children.nodes.length));

const setCategory = (category) => {
  activeCategory.value = category;
  router.push({ query: { ...route.query, category: category } });
};

useOnClickOutside(dropdownRef, () => {
  if (isDropdownVisible.value) {
    isDropdownVisible.value = false;
  }
});
</script>
