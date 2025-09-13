<script setup>
const router = useRouter();
const route = useRoute();

const selectedSort = ref(
  !route.query.orderby && !route.query.fieldby ? 'Newest' : route.query.orderby === 'DESC' && route.query.fieldby === 'PRICE' ? 'Price: High to Low' : 'Price: Low to High'
);

const options = reactive([
  { value: 'Newest', label: $t('filter.newest') },
  { value: 'Price: High to Low', label: $t('filter.price_high_low') },
  { value: 'Price: Low to High', label: $t('filter.price_low_high') },
]);

const setSort = value => {
  selectedSort.value = value;
  const query = { ...route.query };

  switch (value) {
    case 'Newest':
      delete query.orderby;
      delete query.fieldby;
      break;
    case 'Price: High to Low':
      query.orderby = 'DESC';
      query.fieldby = 'PRICE';
      break;
    case 'Price: Low to High':
      query.orderby = 'ASC';
      query.fieldby = 'PRICE';
      break;
  }
  router.push({ query });
};

const isDropdownVisible = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, event => (isDropdownVisible.value = false));
</script>

<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold" ref="dropdownRef" @click="isDropdownVisible = !isDropdownVisible">
    <div
      class="box-border flex items-center rounded-full p-3.5 transition-all active:scale-95"
      :class="{
        'bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white': isDropdownVisible,
        'bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-[#262626] hover:dark:bg-[#333]': !isDropdownVisible,
      }">
      <UIcon name="i-iconamoon-options-duotone" size="22" />
    </div>
    <Transition name="dropdown">
      <div
        v-if="isDropdownVisible"
        class="absolute top-full left-0 z-10 mt-3 lg:mt-[18px] rounded-2xl text-base font-semibold bg-white dark:bg-[#262626] shadow-[0_0_8px_rgba(0,0,0,.1)]">
        <div class="m-2 w-48">
          <div
            v-for="(option, i) in options"
            :key="i"
            @click="setSort(option.value)"
            class="rounded-[10px] px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9] hover:dark:bg-[#3c3c3c]">
            <div class="flex items-center justify-between">
              <div class="mr-1 w-full">{{ option.label }}</div>
              <UIcon v-if="selectedSort === option.value" name="i-iconamoon-check-circle-1-fill" size="24" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
