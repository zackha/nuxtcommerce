<template>
  <div class="py-8 w-full items-center flex-col">
    <div class="container m-auto">
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <div v-for="(category, i) in categories" :key="i">
          <div class="w-[444px] min-h-[306px]">
            <div class="pb-[75%] rounded-[32px] relative overflow-hidden">
              <div class="absolute left-0 right-0 top-0 bottom-0">
                <div class="h-full relative">
                  <NuxtImg
                    class="object-cover absolute w-full h-full"
                    src="https://nuxtcommerce.terodon.com/wp-content/uploads/2023/07/d08ec3ea0a65a2c40c6dcb0871ec98a3.jpg"
                    loading="lazy"
                    title="Sweatshirts" />
                  <div class="absolute left-0 right-0 top-0 bottom-0 overflow-hidden">
                    <div class="w-full h-full bg-gradient-to-t from-black/40 items-end py-6 px-5 flex flex-row">
                      <div class="w-full justify-center flex flex-col">
                        <div class="text-center font-semibold text-3xl">Sweatshirts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import getCategories from '~/gql/queries/getCategories.gql';

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((category) => category.products.nodes.length && category.children.nodes.length));
</script>
