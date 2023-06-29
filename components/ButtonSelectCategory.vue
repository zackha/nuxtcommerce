<template>
  <div class="relative cursor-pointer select-none items-center justify-center text-base font-semibold">
    <div class="box-border flex items-center rounded-full py-3.5 px-5 transition-all bg-[#efefef] hover:bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/20 active:scale-95">
      <span class="mr-3">{{ selectedCategory || 'All Categories' }}</span>
      <Icon name="ion:chevron-down-outline" size="14" />
    </div>
    <Transition>
      <div
        class="absolute left-0 top-full z-10 mt-3 rounded-xl border border-neutral-800/10 dark:border-white/10 text-[13px] font-medium backdrop-blur-xl bg-white/90 dark:bg-neutral-800/80 shadow-lg">
        <div class="m-2 w-44">
          <div @click="selectCategory()" class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">All Categories</div>
              <Icon v-if="!selectedCategory" name="mingcute:check-line" size="16" />
            </div>
          </div>
          <div
            v-for="(category, i) in categories"
            :key="i"
            @click="selectCategory(category.name)"
            class="rounded-lg px-3 py-2 transition-all duration-300 hover:bg-neutral-800/5 hover:dark:bg-white/5">
            <div class="flex items-center justify-between">
              <div class="mr-4 w-full">{{ category.name }}</div>
              <Icon v-if="selectedCategory === category.name" name="mingcute:check-line" size="16" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import getCategories from '~/gql/queries/getCategories.gql';

const route = useRoute();
const router = useRouter();
const selectedCategory = ref(route.query.category);

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((categories) => categories.products.nodes.length && categories.children.nodes.length));

const selectCategory = (category) => {
  selectedCategory.value = category;
  router.push({ path: '/', query: { ...route.query, category: category } });
};
</script>
