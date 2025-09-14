<!--app/pages/product/[id].vue-->
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
const { isOpenImageSliderModal } = useComponents();
const localePath = useLocalePath();

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const thumbsSwiper = ref(null);
const setThumbsSwiper = swiper => {
  thumbsSwiper.value = swiper;
};

const modules = [Navigation, Pagination, Thumbs];

const route = useRoute();
const id = computed(() => route.params.id);
const parts = id.value.split('-');
const sku = parts.pop();
const slug = parts.join('-');

const productResult = ref({});
const selectedVariation = ref(null);

onMounted(() => {
  $fetch('/api/product', {
    query: { slug, sku },
  }).then(data => (productResult.value = data.product));
});

const product = computed(() => productResult.value);

const sizeOrder = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '23-24', '25', '26-27', '28-29', '30', '31-32', '33', '34-25'];

const sortedVariations = computed(() => {
  if (!product.value.variations?.nodes) return [];
  return product.value.variations.nodes.slice().sort((a, b) => {
    const aSize = a.attributes.nodes[0].value.toLowerCase();
    const bSize = b.attributes.nodes[0].value.toLowerCase();
    return sizeOrder.indexOf(aSize) - sizeOrder.indexOf(bSize);
  });
});

watchEffect(() => {
  if (sortedVariations.value.length > 0) {
    const variationInStock = sortedVariations.value.find(variation => variation.stockStatus === 'IN_STOCK');
    selectedVariation.value = variationInStock ? variationInStock : null;
  }
});

const calculateDiscountPercentage = computed(() => {
  if (!product.value.salePrice || !product.value.regularPrice) return 0;
  const salePriceValue = parseFloat(product.value.salePrice.replace(/[^0-9]/g, ''));
  const regularPriceValue = parseFloat(product.value.regularPrice.replace(/[^0-9]/g, ''));
  return Math.round(((salePriceValue - regularPriceValue) / regularPriceValue) * 100);
});

const { name } = useAppConfig();
const url = useRequestURL();
const canonical = url.origin + url.pathname;
const image = computed(() => product.value?.image?.sourceUrl);
const plainDescription = computed(() => {
  const raw = product.value?.description?.replace(/<[^>]+>/g, '');
  return raw ? raw.slice(0, 160) : '';
});

useHead(() => {
  const title = product.value?.name || name;
  const description = plainDescription.value;
  const img = image.value;
  const keywords = [product.value?.name, product.value?.allPaStyle?.nodes?.[0]?.name, name].filter(Boolean).join(', ');

  return {
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: img,
    ogUrl: canonical,
    canonical,
    ogType: 'product',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: img,
    keywords,
  };
});

const productSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.value?.name,
  description: plainDescription.value,
  image: image.value ? [image.value] : [],
  sku: product.value?.sku,
  brand: { '@type': 'Brand', name: name },
}));

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(productSchema.value),
    },
  ],
}));

const { handleAddToCart, addToCartButtonStatus } = useCart();
</script>

<template>
  <ProductSkeleton v-if="!product.name" />
  <div v-else class="justify-center flex flex-col lg:flex-row lg:mx-5">
    <ButtonBack />
    <div class="mr-6 mt-5 pt-2.5 max-xl:hidden">
      <swiper :modules="modules" @swiper="setThumbsSwiper" class="product-images-thumbs w-14">
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black">
          <NuxtImg
            :alt="product.name"
            class="h-full w-full border-2 border-white bg-neutral-200 dark:bg-neutral-800 dark:border-black rounded-[10px]"
            :src="product.image?.sourceUrl" />
        </swiper-slide>
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black" v-for="(node, i) in product.galleryImages?.nodes" :key="i">
          <NuxtImg :alt="product.name" class="h-full w-full border-2 border-white bg-neutral-200 dark:bg-neutral-800 dark:border-black rounded-[10px]" :src="node.sourceUrl" />
        </swiper-slide>
      </swiper>
    </div>
    <div
      class="flex lg:p-5 lg:gap-5 flex-col lg:flex-row lg:border lg:border-transparent lg:dark:border-[#262626] lg:rounded-[32px] lg:shadow-[0_1px_20px_rgba(0,0,0,.15)] lg:mt-2.5 select-none">
      <div class="relative">
        <swiper
          :style="{
            '--swiper-navigation-size': '16px',
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': 'rgb(0 0 0 / 50%)',
          }"
          :spaceBetween="4"
          :slidesPerView="1.5"
          :pagination="{
            dynamicBullets: true,
          }"
          :navigation="true"
          :modules="modules"
          :thumbs="{ swiper: thumbsSwiper }"
          class="lg:w-[530px] lg:h-[530px] xl:w-[600px] xl:h-[600px] lg:rounded-2xl">
          <swiper-slide @click="isOpenImageSliderModal = true">
            <NuxtImg :alt="product.name" class="h-full w-full bg-neutral-200 dark:bg-neutral-800" :src="product.image?.sourceUrl" />
          </swiper-slide>
          <swiper-slide @click="isOpenImageSliderModal = true" v-for="(node, i) in product.galleryImages?.nodes" :key="i">
            <NuxtImg :alt="product.name" class="h-full w-full bg-neutral-200 dark:bg-neutral-800" :src="node.sourceUrl" />
          </swiper-slide>
        </swiper>
      </div>
      <ImageSliderWithModal :product="product" v-model="isOpenImageSliderModal" />
      <div class="w-full lg:max-w-[28rem]">
        <div class="flex-col flex gap-4 lg:max-h-[530px] xl:max-h-[600px] overflow-hidden">
          <div class="p-3 lg:pb-4 lg:p-0 border-b border-[#efefef] dark:border-[#262626]">
            <h1 class="text-2xl font-semibold mb-1">{{ product.name }}</h1>
            <div class="flex justify-between flex-row items-baseline">
              <div class="flex flex-row items-baseline">
                <p class="text-xl font-bold text-alizarin-crimson-700" v-html="product.salePrice"></p>
                <p class="text-sm ml-2">{{ $t('product.vat_included') }}</p>
              </div>
            </div>
            <div class="flex-wrap items-baseline flex-row flex">
              <p class="text-sm">{{ $t('product.originally') }}:</p>
              <p class="text-sm ml-1 line-through" v-html="product.regularPrice"></p>
              <p class="text-sm ml-1 text-alizarin-crimson-700">{{ calculateDiscountPercentage }}%</p>
            </div>
          </div>

          <div class="flex gap-2 px-3 lg:px-0" v-for="(variation, i) in product.productTypes?.nodes" :key="i">
            <div v-for="(vars, i) in variation.products.nodes" :key="i">
              <NuxtLink
                :to="localePath(`/product/${vars.slug}-${product.sku.split('-')[0]}`)"
                :class="[
                  'flex w-12 rounded-lg border-2 select-varitaion transition-all duration-200 bg-neutral-200 dark:bg-neutral-800',
                  vars.allPaColor.nodes[0].name === product.allPaColor.nodes[0].name ? 'selected-varitaion' : 'border-[#9b9b9b] dark:border-[#8c8c8c]',
                ]">
                <NuxtImg
                  :alt="vars.allPaColor.nodes[0].name"
                  :src="vars.image.sourceUrl"
                  :title="vars.allPaColor.nodes[0].name"
                  class="rounded-md border-2 border-white dark:border-black" />
              </NuxtLink>
            </div>
          </div>

          <div class="pb-4 px-3 lg:px-0 border-b border-[#efefef] dark:border-[#262626]">
            <div class="text-sm font-semibold leading-5 opacity-50 flex gap-1">
              {{ $t('product.size') }}:
              <div class="uppercase">{{ selectedVariation.attributes.nodes.map(attr => attr.value).toString() }}</div>
            </div>
            <div class="flex gap-2 mt-2 mb-4 flex-wrap">
              <label
                class="py-1 px-3 rounded-md cursor-pointer select-varitaion border-2 border-[#9b9b9b] dark:border-[#8c8c8c] transition-all duration-200"
                v-for="variation in sortedVariations"
                :key="variation.databaseId"
                :class="[variation.stockStatus === 'OUT_OF_STOCK' ? 'disabled' : '', selectedVariation.databaseId === variation.databaseId ? 'selected-varitaion' : '']">
                <input type="radio" class="hidden" name="variation" :value="variation" :disabled="variation.stockStatus === 'OUT_OF_STOCK'" v-model="selectedVariation" />
                <span class="font-semibold uppercase" :title="`Size: ${variation.attributes.nodes.map(attr => attr.value).toString()}`">
                  {{ variation.attributes.nodes.map(attr => attr.value).toString() }}
                </span>
              </label>
            </div>

            <div class="flex">
              <button
                @click="handleAddToCart(selectedVariation.databaseId)"
                :disabled="addToCartButtonStatus !== 'add'"
                class="button-bezel w-full h-12 rounded-md relative tracking-wide font-semibold text-white text-sm flex justify-center items-center">
                <Transition name="slide-up">
                  <div v-if="addToCartButtonStatus === 'add'" class="absolute">{{ $t('cart.add_to_cart') }}</div>
                  <UIcon v-else-if="addToCartButtonStatus === 'loading'" class="absolute" name="i-svg-spinners-90-ring-with-bg" size="22" />
                  <div v-else-if="addToCartButtonStatus === 'added'" class="absolute">{{ $t('cart.added_to_cart') }}!</div>
                </Transition>
              </button>
              <ButtonWishlist :product="product" />
            </div>
          </div>
          <div class="px-3 lg:px-0">
            <div class="text-base mb-2 font-semibold">{{ $t('product.featured_information') }}</div>
            <div class="description leading-7 text-sm">
              <ul>
                <li>
                  {{ $t('product.free_return') }}
                  <a class="underline" href="#">{{ $t('product.information') }}</a>
                </li>
                <li>{{ $t('product.sku') }}: {{ product.sku }}</li>
                <div v-html="product.description"></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-lg lg:text-xl lg:text-center font-semibold mt-4 pt-4 px-3 border-t border-[#efefef] dark:border-[#262626] lg:border-none">{{ $t('product.shop_similar') }}</div>
  <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 px-3 lg:px-5 xl:px-8 mt-4 lg:mt-5">
    <ProductCard :products="product.related?.nodes" />
    <ProductsSkeleton v-if="!product.name" />
  </div>
</template>

<style lang="postcss">
.product-images-thumbs .swiper-wrapper {
  @apply flex-col gap-3;
}
.product-images-thumbs .swiper-slide-thumb-active {
  @apply border-black dark:border-white;
}
.swiper-button-next,
.swiper-button-prev {
  @apply bg-white/50 hover:bg-white p-6 rounded-full flex items-center justify-center shadow transition backdrop-blur-sm;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  @apply hidden;
}

.swiper-pagination {
  @apply bg-white/50 shadow-sm rounded-full py-1 backdrop-blur-sm;
}

.selected-varitaion,
.select-varitaion:hover:not(.disabled) {
  @apply border-alizarin-crimson-700 dark:border-alizarin-crimson-700 text-alizarin-crimson-700 bg-red-700/10;
}

.disabled {
  @apply opacity-40 cursor-default;
}

.button-bezel {
  box-shadow: 0 0 0 var(--button-outline, 0px) rgb(222, 92, 92, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 1px 2px 0 rgba(0, 0, 0, 0.5);
  @apply bg-alizarin-crimson-700 outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;
  &:hover {
    @apply bg-alizarin-crimson-600;
  }
  &:active {
    --button-outline: 4px;
    --button-scale: 0.975;
  }
}

.description ul li {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxlbGxpcHNlIHJ5PSIzIiByeD0iMyIgY3k9IjMiIGN4PSIzIiBmaWxsPSIjYzljOWM5Ii8+PC9zdmc+)
    no-repeat 0 0.7rem;
  padding-left: 0.938rem;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0);
}
</style>
