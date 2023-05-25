<template>
  <ButtonBack />
  <div v-if="loading">loading...</div>
  <div v-else class="border mt-10 mb-10 rounded-[32px]">
    <div class="flex p-5 flex-row gap-6">
      <div class="">
        <div class="w-[400px]">
          <NuxtImg :src="product.image.sourceUrl" class="rounded-2xl" />
        </div>
      </div>
      <div>
        <h1 class="text-2xl">{{ product.name }}</h1>
        <div class="flex-col flex">
          <div class="flex justify-between flex-row items-baseline">
            <div class="flex flex-row items-baseline">
              <p class="text-xl font-bold" v-html="product.salePrice"></p>
              <p class="text-sm ml-2">VAT included</p>
            </div>
          </div>
          <div class="flex-wrap items-baseline flex-row flex">
            <p class="text-sm">Originally:</p>
            <p class="text-sm ml-1 line-through" v-html="product.regularPrice"></p>
            <p class="text-sm ml-1">{{ calculateDiscountPercentage }}%</p>
          </div>
          <div class="flex gap-2 mt-3 flex-wrap">
            <label v-for="(variation, i) in product.variations.nodes" :key="variation.id" :class="[variation.stockStatus === 'OUT_OF_STOCK' ? 'disabled' : '']">
              <input
                type="radio"
                :name="`Size - ${variation.attributes.nodes.map((attr) => attr.value).toString()}`"
                :id="i"
                class="hidden"
                :value="variation.attributes.nodes.map((attr) => attr.value).toString()"
                v-model="selectedVariation" />
              <span class="py-1.5 px-2 border rounded leading-[10px] h-6">{{ variation.attributes.nodes.map((attr) => attr.value).toString() }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedVariation = ref(null);
const route = useRoute();
import { getProduct } from '~/gql/queries/getProduct.gql';

const { result: productResult, loading } = useQuery(getProduct, () => ({ slug: route.params.slug }));
const product = computed(() => productResult.value?.product);

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

<style>
.disabled {
  opacity: 0.4;
}
input[type='radio']:checked ~ span {
  background-color: #f00;
}
</style>
