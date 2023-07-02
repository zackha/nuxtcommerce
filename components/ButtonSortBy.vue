<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold" @click="isDropdownVisible = !isDropdownVisible">
    <div
      class="box-border flex items-center rounded-full py-3.5 pl-5 pr-4 transition-all active:scale-95"
      :class="{ 'bg-black text-white hover:bg-black': isDropdownVisible, 'bg-[#efefef] hover:bg-[#e2e2e2]': !isDropdownVisible }">
      <span class="mr-1.5">{{ selectedSort }}</span>
      <Icon name="iconamoon:arrow-down-2" size="24" />
    </div>
    <Transition>
      <div v-if="isDropdownVisible" ref="dropdownRef" class="absolute top-full right-0 z-10 mt-[18px] rounded-2xl text-base font-semibold bg-white shadow-[0_0_8px_rgba(0,0,0,.1)]">
        <div class="m-2 w-48">
          <div v-for="(option, i) in options" :key="i" @click="setSort(option.value)" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9]">
            <div class="flex items-center justify-between">
              <div class="mr-1 w-full">{{ option.value }}</div>
              <Icon v-if="selectedSort === option.value" name="iconamoon:check-bold" size="20" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const isDropdownVisible = ref(false);
const dropdownRef = ref(null);
const router = useRouter();
const route = useRoute();
const selectedSort = ref(
  !route.query.orderby && !route.query.fieldby ? 'Newest' : route.query.orderby === 'DESC' && route.query.fieldby === 'PRICE' ? 'Price: High to Low' : 'Price: Low to High'
);

const options = reactive([{ value: 'Newest' }, { value: 'Price: High to Low' }, { value: 'Price: Low to High' }]);

const setSort = (value) => {
  selectedSort.value = value;
  let query = {};

  switch (value) {
    case 'Newest':
      query = { ...route.query };
      delete query.orderby;
      delete query.fieldby;
      break;
    case 'Price: High to Low':
      query = { ...route.query, orderby: 'DESC', fieldby: 'PRICE' };
      break;
    case 'Price: Low to High':
      query = { ...route.query, orderby: 'ASC', fieldby: 'PRICE' };
      break;
  }
  router.push({ query });
};

useOnClickOutside(dropdownRef, () => {
  if (isDropdownVisible.value) {
    isDropdownVisible.value = false;
  }
});
</script>
