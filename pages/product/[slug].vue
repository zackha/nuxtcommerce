<template>
  <ButtonBack />
  <div v-if="loading">loading...</div>
  <div v-else class="border mt-10 mb-10 rounded-[32px]">
    <div class="flex p-5 flex-row gap-6">
      <div class="relative">
        <div class="w-[400px]">
          <NuxtImg :src="product.image.sourceUrl" class="rounded-2xl" />
          <div class="bullets-wrapper">
            <div class="bullets-container gap-2">
              <NuxtImg class="w-6 rounded-sm" :src="product.image.sourceUrl" />
              <NuxtImg class="w-6 rounded-sm" v-for="node in product.galleryImages.nodes" :key="node.id" :src="node.sourceUrl" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex-col flex gap-4">
          <div class="pb-4 border-b border-white/20">
            <h1 class="text-2xl font-semibold mb-1">{{ product.name }}</h1>
            <div class="flex justify-between flex-row items-baseline">
              <div class="flex flex-row items-baseline">
                <p class="text-xl font-bold text-[#ff0000]" v-html="product.salePrice"></p>
                <p class="text-sm ml-2">VAT included</p>
              </div>
            </div>
            <div class="flex-wrap items-baseline flex-row flex">
              <p class="text-sm">Originally:</p>
              <p class="text-sm ml-1 line-through" v-html="product.regularPrice"></p>
              <p class="text-sm ml-1 text-[#ff0000]">{{ calculateDiscountPercentage }}%</p>
            </div>
          </div>
          <div class="flex gap-2" v-for="(variation, i) in product.productTypes.nodes" :key="variation.id">
            <div v-for="(vars, i) in variation.products.nodes" :key="vars.id">
              <NuxtLink :to="`/product/${vars.slug}-${product.sku.split('-')[0]}`" class="flex w-12">
                <div class="">
                  <NuxtImg :src="vars.image.sourceUrl" :title="vars.allPaColor.nodes[0].name" class="rounded-md" />
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="pb-4 border-b border-white/20">
            <div class="text-sm font-semibold leading-5">Size: {{ selectedVariation }}</div>
            <div class="flex gap-2 mt-3 mb-4 flex-wrap">
              <label
                class="py-1 px-3 border rounded-md cursor-pointer select"
                v-for="variation in product.variations.nodes"
                :key="variation.id"
                :class="[
                  variation.stockStatus === 'OUT_OF_STOCK' ? 'disabled' : '',
                  selectedVariation === variation.attributes.nodes.map((attr) => attr.value).toString() ? 'selected' : '',
                ]">
                <input
                  type="radio"
                  class="hidden"
                  name="variation"
                  :value="variation.attributes.nodes.map((attr) => attr.value).toString()"
                  :disabled="variation.stockStatus === 'OUT_OF_STOCK'"
                  v-model="selectedVariation" />
                <span :title="`Size: ${variation.attributes.nodes.map((attr) => attr.value).toString()}`">{{
                  variation.attributes.nodes.map((attr) => attr.value).toString()
                }}</span>
              </label>
            </div>
            <div class="flex">
              <button type="submit" class="w-full h-12 border rounded-md tracking-wide font-semibold border-[#990000] bg-[#ff0000] transition duration-200 hover:bg-[#c90000]">
                Add to Cart
              </button>
              <div class="cursor-pointer">
                <div class="w-12 h-12 rounded-md border ml-4 flex justify-center items-center">
                  <Icon name="ion:heart-outline" size="26" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="text-base mb-2 font-semibold">Featured Information</div>
            <div class="description leading-7 overflow-hidden max-h-84 text-sm">
              <ul>
                <li>Free returns within 15 days. Click for detailed <a class="underline" href="#">information</a>.</li>
                <li>Article number: {{ product.sku }}</li>
                <div v-html="product.description"></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute().params.slug;
const parts = route.split('-');
const sku = parts.pop();
const slug = parts.join('-');

import { getProduct } from '~/gql/queries/getProduct.gql';

const { result: productResult, loading } = useQuery(getProduct, () => ({ slug: slug, sku: sku }));
const product = computed(() => productResult.value?.product);

const selectedVariation = ref(null);

watchEffect(() => {
  if (productResult.value?.product.variations.nodes) {
    const variationInStock = product.value.variations.nodes.find((variation) => variation.stockStatus === 'IN_STOCK');
    selectedVariation.value = variationInStock ? variationInStock.attributes.nodes.map((attr) => attr.value).toString() : null;
  }
});

const calculateDiscountPercentage = computed(() => {
  const salePriceValue = parseFloat(productResult.value?.product.salePrice.replace(/[^0-9]/g, ''));
  const regularPriceValue = parseFloat(productResult.value?.product.regularPrice.replace(/[^0-9]/g, ''));
  return Math.round(((salePriceValue - regularPriceValue) / regularPriceValue) * 100);
});

//  useQuery
//
// import getProduct from '~/gql/queries/getProduct.gql';
// const { result, loading } = useQuery(getProduct, () => ({ slug: useRoute().params.slug }));
// const output = computed(() => result.value?.product);
// console.log(output.value?.name);

//  useAsyncQuery
//
//  import getProduct from '~/gql/queries/getProduct.gql';
//  const product = await useAsyncQuery(getProduct, {
//    slug: useRoute().params.slug,
//  });
//  console.log(product.data.value.product.name);

//  useAsyncQuery 2
//
// import getProduct from '~/gql/queries/getProduct.gql';
// const prod = ref();
// onMounted(async () => {
//   const product = await useAsyncQuery(getProduct, { slug: useRoute().params.slug });
//   prod.value = product.data.value.product.name;
//   console.log(product.data.value.product.name);
// });

// useAsyncQuery 3
// const route = useRoute();
// import getProduct from '~/gql/queries/getProduct.gql';
// const { data } = await useAsyncQuery(getProduct, { slug: route.params.slug });
// const product = data?.value?.product;
</script>

<style lang="postcss">
.disabled {
  @apply opacity-40 cursor-default;
}
.selected,
.select:hover:not(.disabled) {
  background-color: rgb(242 26 26 / 15%);
  border: solid 2px #ff0000;
  padding: 0.188rem 0.688rem;
  color: #ff0000;
}
.description ul li {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxlbGxpcHNlIHJ5PSIzIiByeD0iMyIgY3k9IjMiIGN4PSIzIiBmaWxsPSIjYzljOWM5Ii8+PC9zdmc+)
    no-repeat 0 0.7rem;
  padding-left: 0.938rem;
}
.bullets-wrapper {
  @apply p-2 rounded-xl absolute left-1/2 bottom-2 -translate-x-1/2 shadow-2xl backdrop-blur-xl border dark:bg-neutral-800/30 dark:border-white/10;
}
.bullets-wrapper .bullets-container {
  @apply flex justify-center items-center overflow-hidden rounded-md;
}
</style>
