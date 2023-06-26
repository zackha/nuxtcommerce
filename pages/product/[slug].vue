<template>
  <AppHeader />
  <ProductPageSkeleton v-if="loading" />
  <div v-else class="justify-center flex flex-row pt-20 mb-8">
    <ButtonBack />
    <div class="mr-6 mt-5 pt-2.5">
      <swiper :modules="modules" @swiper="setThumbsSwiper" class="product-images-thumbs w-14">
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black">
          <NuxtImg class="h-full w-full border-2 border-white dark:border-black rounded-[10px]" :src="product.image.sourceUrl" />
        </swiper-slide>
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black" v-for="(node, i) in product.galleryImages.nodes" :key="i">
          <NuxtImg class="h-full w-full border-2 border-white dark:border-black rounded-[10px]" :src="node.sourceUrl" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex p-5 flex-row gap-6 w-3/5 border border-transparent dark:border-[#262626] rounded-[32px] shadow-[0_1px_20px_rgba(0,0,0,.1)] mt-2.5">
      <div class="relative">
        <swiper
          :spaceBetween="4"
          :slidesPerView="1.5"
          :pagination="{
            dynamicBullets: true,
          }"
          :navigation="true"
          :modules="modules"
          :thumbs="{ swiper: thumbsSwiper }"
          class="w-[600px] h-[600px] rounded-2xl product-images">
          <swiper-slide><NuxtImg class="h-full w-full" :src="product.image.sourceUrl" /></swiper-slide>
          <swiper-slide v-for="(node, i) in product.galleryImages.nodes" :key="i"><NuxtImg class="h-full w-full" :src="node.sourceUrl" /></swiper-slide>
        </swiper>
      </div>
      <div class="w-full">
        <div class="flex-col flex gap-4">
          <div class="pb-4 border-b border-[#efefef] dark:border-[#262626]">
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
          <div class="flex gap-2" v-for="(variation, i) in product.productTypes.nodes" :key="i">
            <div v-for="(vars, i) in variation.products.nodes" :key="i">
              <NuxtLink
                :to="`/product/${vars.slug}-${product.sku.split('-')[0]}`"
                class="flex w-12 rounded-lg border-2 border-[#9b9b9b] dark:border-[#8c8c8c] select"
                :class="[vars.allPaColor.nodes[0].name === product.allPaColor.nodes[0].name ? 'selected' : '']">
                <div class="">
                  <NuxtImg :src="vars.image.sourceUrl" :title="vars.allPaColor.nodes[0].name" class="rounded-md border-2 border-white dark:border-black" />
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="pb-4 border-b border-[#efefef] dark:border-[#262626]">
            <div class="text-sm font-semibold leading-5 opacity-50">Size: {{ selectedVariation }}</div>
            <div class="flex gap-2 mt-2 mb-4 flex-wrap">
              <label
                class="py-1 px-3 rounded-md cursor-pointer select border-2 border-[#9b9b9b] dark:border-[#8c8c8c]"
                v-for="(variation, i) in product.variations.nodes"
                :key="i"
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
                <span class="font-semibold" :title="`Size: ${variation.attributes.nodes.map((attr) => attr.value).toString()}`">{{
                  variation.attributes.nodes.map((attr) => attr.value).toString()
                }}</span>
              </label>
            </div>
            <div class="flex">
              <button type="submit" class="w-full h-12 text-white rounded-md tracking-wide font-semibold bg-[#e60023] transition duration-200 hover:bg-[#ad081b]">
                Add to Cart
              </button>
              <div class="cursor-pointer">
                <div class="w-12 h-12 rounded-md ml-4 flex justify-center items-center border-2 text-[#8c8c8c] border-[#e6e6e6] dark:border-[#262626]">
                  <Icon name="ph:heart-bold" size="24" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="text-base mb-2 font-semibold">Featured Information</div>
            <div class="description leading-7 overflow-hidden max-h-84 text-sm max-h-48">
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
  <div class="text-xl font-semibold text-center my-5">Shop similar</div>
  <div class="grid grid-cols-7 gap-4 px-20 mt-4">
    <ProductCard :products="related" />
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { getProduct } from '~/gql/queries/getProduct.gql';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [Navigation, Pagination, Thumbs];
const route = useRoute().params.slug;
const parts = route.split('-');
const sku = parts.pop();
const slug = parts.join('-');

const { result: productResult, loading } = useQuery(getProduct, () => ({ slug: slug, sku: sku }));
const product = computed(() => productResult.value?.product);
const related = computed(() => productResult.value?.product.related.nodes);

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
.product-images-thumbs .swiper-wrapper {
  @apply flex-col gap-3;
}
.product-images-thumbs .swiper-slide-thumb-active {
  @apply border-black dark:border-white;
}
.disabled {
  @apply opacity-40 cursor-default;
}
.selected,
.select:hover:not(.disabled) {
  background-color: rgb(242 26 26 / 10%);
  border-color: #ff0000 !important;
  color: #ff0000;
}
.description ul li {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxlbGxpcHNlIHJ5PSIzIiByeD0iMyIgY3k9IjMiIGN4PSIzIiBmaWxsPSIjYzljOWM5Ii8+PC9zdmc+)
    no-repeat 0 0.7rem;
  padding-left: 0.938rem;
}
.bullets-wrapper {
  @apply p-2 rounded-xl absolute left-1/2 bottom-2 -translate-x-1/2 backdrop-blur-xl border dark:bg-neutral-800/30 dark:border-white/10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
.bullets-wrapper .bullets-container {
  @apply flex justify-center overflow-hidden items-center rounded-md;
}
</style>
