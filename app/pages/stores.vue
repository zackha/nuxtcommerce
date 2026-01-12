<script setup>
import storesData from '~/data/stores.json';
const config = useRuntimeConfig();

if (!config.public.enableStoreLocator) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const { t } = useI18n();

const timeToMinutes = (timeStr) => {
  if (!timeStr || timeStr.toLowerCase() === 'closed') return -1;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkStoreStatus = (weeklyHours) => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = weeklyHours.find(day => day.day === currentDay);

  if (!todaySchedule || todaySchedule.hours.toLowerCase().includes('closed')) {
    return false;
  }

  const [openStr, closeStr] = todaySchedule.hours.split(' - ');

  if (!openStr || !closeStr) return false;

  const openTime = timeToMinutes(openStr);
  const closeTime = timeToMinutes(closeStr);

  return currentMinutes >= openTime && currentMinutes < closeTime;
};

const searchQuery = ref('');
const selectedStoreId = ref(null);
const expandedStoreId = ref(null);

const filteredStores = computed(() => {
  let result = storesData.map(store => ({
    ...store,
    isOpen: checkStoreStatus(store.weeklyHours)
  }));

  if (searchQuery.value) {
    const lowerQuery = searchQuery.value.toLowerCase();
    result = result.filter(store =>
        store.name.toLowerCase().includes(lowerQuery) ||
        store.address.toLowerCase().includes(lowerQuery)
    );
  }

  return result;
});

const selectStore = (store) => {
  selectedStoreId.value = store.id;
};

const toggleHours = (id) => {
  expandedStoreId.value = expandedStoreId.value === id ? null : id;
};
</script>

<template>
  <div class="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">

    <div class="w-full lg:w-1/3 flex flex-col bg-white dark:bg-black border-r border-gray-200 dark:border-neutral-800 h-1/2 lg:h-full z-10 shadow-xl lg:shadow-none">

      <div class="p-5 border-b border-gray-200 dark:border-neutral-800 shrink-0">
        <h1 class="text-2xl font-bold mb-4">{{ $t('stores.find_store') }}</h1>
        <div class="relative">
          <UIcon name="i-iconamoon-search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size="20" />
          <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('stores.search_placeholder')"
              class="w-full bg-gray-100 dark:bg-neutral-900 border-none rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          >
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-2">
        <div v-if="filteredStores.length === 0" class="p-8 text-center text-gray-400">
          {{ $t('stores.no_stores_found') }}
        </div>

        <div
            v-for="store in filteredStores"
            :key="store.id"
            @click="selectStore(store)"
            class="p-4 mb-2 rounded-xl cursor-pointer border-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-900"
            :class="selectedStoreId === store.id ? 'border-black dark:border-white bg-gray-50 dark:bg-neutral-900' : 'border-transparent'"
        >
          <div class="mb-3">
            <h3 class="font-bold text-lg leading-tight">{{ store.name }}</h3>
            <p class="text-neutral-500 text-sm mt-1">{{ store.address }}</p>
          </div>

          <div class="mb-4">
            <button
                @click.stop="toggleHours(store.id)"
                class="flex items-center gap-2 text-sm w-full group"
            >
                <span
                    class="text-xs font-bold px-2 py-0.5 rounded-md uppercase"
                    :class="store.isOpen ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'"
                >
                    {{ store.isOpen ? $t('stores.open') : $t('stores.closed') }}
                </span>

              <span class="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {{ $t('stores.opening_hours') }}
                </span>

              <UIcon
                  name="i-iconamoon-arrow-down-2"
                  class="text-neutral-400 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedStoreId === store.id }"
              />
            </button>

            <div
                class="grid transition-all duration-300 ease-in-out overflow-hidden"
                :class="expandedStoreId === store.id ? 'grid-rows-[1fr] mt-3 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'"
            >
              <div class="min-h-0 text-sm text-neutral-600 dark:text-neutral-400 space-y-1 pl-1">
                <div v-for="(daySchedule, i) in store.weeklyHours" :key="i" class="flex justify-between w-full max-w-[200px]">
                  <span class="capitalize w-24" :class="{'font-bold text-black dark:text-white': daySchedule.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}">
                    {{ $t(`days.${daySchedule.day}`) }}
                  </span>
                  <span class="font-medium text-black dark:text-white">{{ daySchedule.hours }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <a :href="`tel:${store.phone}`" class="flex-1 text-center text-sm font-semibold border border-gray-200 dark:border-neutral-700 rounded-lg py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              {{ $t('stores.call') }}
            </a>
            <a :href="`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`" target="_blank" class="flex-1 text-center text-sm font-semibold bg-black text-white dark:bg-white dark:text-black rounded-lg py-2">
              {{ $t('stores.navigate') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-2/3 h-1/2 lg:h-full relative lg:p-3">

      <div class="w-full h-full lg:rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-neutral-700 relative">
        <ClientOnly>
          <StoreMap
              :stores="filteredStores"
              :selected-store-id="selectedStoreId"
          />
          <template #fallback>
            <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-neutral-900 text-neutral-400">
              <UIcon name="i-svg-spinners-90-ring-with-bg" size="40" />
            </div>
          </template>
        </ClientOnly>
      </div>

    </div>
  </div>
</template>