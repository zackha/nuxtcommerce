<template>
  <div class="py-8 w-full items-center flex-col">
    <div class="container m-auto">
      <div class="flex flex-row flex-wrap justify-center">
        <NuxtLink v-for="(category, i) in categories" :key="i" class="group" :to="`/?category=${category.name}`">
          <div v-if="category.image" class="w-[444px] min-h-[306px] p-2">
            <div class="pb-[75%] relative overflow-hidden">
              <div class="absolute left-0 right-0 top-0 bottom-0">
                <div class="h-full relative">
                  <NuxtImg
                    class="object-cover absolute w-full h-full transition-all group-active:scale-95 rounded-[32px]"
                    :src="category.image.sourceUrl"
                    loading="lazy"
                    :title="category.name" />
                  <div class="absolute left-0 right-0 top-0 bottom-0 overflow-hidden bg-gradient-to-t hover:from-black/40 transition-all group-active:scale-95 rounded-[32px]">
                    <div class="w-full h-full bg-gradient-to-t from-black/40 items-end py-6 px-5 flex flex-row">
                      <div class="w-full justify-center flex flex-col">
                        <div class="text-center font-semibold text-3xl text-white">{{ category.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import getCategories from '~/gql/queries/getCategories.gql';

const { result: categoriesResult } = useQuery(getCategories);
const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((category) => category.products.nodes.length && category.children.nodes.length));
</script>
