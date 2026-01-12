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
const imageFitClasses = ref({});
const initialSlideIndex = ref(0);
const isLandscape = ref(false);

const activeTab = ref('description');

const productResult = ref({});
const selectedVariation = ref(null);

onMounted(() => {
  $fetch('/api/product', {
    query: { slug, sku },
  }).then(data => (productResult.value = data.product));
});

const product = computed(() => productResult.value);
const specifications = computed(() => {
  const variationAttributes = ['pa_color', 'pa_style', 'pa_variant'];
  return product.value.attributes?.nodes?.filter(attr => !variationAttributes.includes(attr.name)) || [];
});

const getVariationValue = (variation) =>
    variation?.attributes?.nodes?.map(a => a.value).join(', ') || '';

const getVariationLabel = (variation) =>
    variation?.attributes?.nodes?.[0]?.label || 'Option';

const isOutOfStock = (variation) => variation.stockStatus === 'OUT_OF_STOCK';

const sizeOrder = ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '23-24', '25', '26-27', '28-29', '30', '31-32', '33', '34-25'];

const sortedVariations = computed(() => {
  if (!product.value.variations?.nodes) return [];

  return [...product.value.variations.nodes].sort((a, b) => {
    const valA = getVariationValue(a).toLowerCase();
    const valB = getVariationValue(b).toLowerCase();

    const indexA = sizeOrder.indexOf(valA);
    const indexB = sizeOrder.indexOf(valB);

    if (indexA > -1 && indexB > -1) return indexA - indexB;

    return valA.localeCompare(valB);
  });
});

const openModal = (index) => {
  initialSlideIndex.value = index;
  isOpenImageSliderModal.value = true;
};

const handleImageLoad = (event, id) => {
  const img = event.target;
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const isWide = width > height;

  if (id === 'main') {
    isLandscape.value = isWide;
  }

  if (!isWide) {
    imageFitClasses.value[id] = 'object-contain p-2';
  } else {
    imageFitClasses.value[id] = 'object-cover';
  }
};

watchEffect(() => {
  if (sortedVariations.value.length > 0) {
    const variationInStock = sortedVariations.value.find(variation => variation.stockStatus === 'IN_STOCK');
    selectedVariation.value = variationInStock ? variationInStock : null;
  }
});

const { handleAddToCart, addToCartButtonStatus } = useCart();
</script>

<template>
  <ProductSeo v-if="product?.name" :info="product" />
  <ProductSkeleton v-if="!product.name" />
  <div v-else class="justify-center flex flex-col lg:flex-row lg:mx-5">
    <ButtonBack />
    <div class="mr-6 mt-5 pt-2.5 max-xl:hidden">
      <swiper :modules="modules" @swiper="setThumbsSwiper" class="product-images-thumbs w-14">
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black">
          <NuxtImg
              :alt="product.name"
              class="h-full w-full object-cover border-2 border-white bg-neutral-200 dark:bg-neutral-800 dark:border-black rounded-[10px]"
              :src="product.image?.sourceUrl" />
        </swiper-slide>
        <swiper-slide class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black" v-for="(node, i) in product.galleryImages?.nodes" :key="i">
          <NuxtImg :alt="product.name" class="h-full w-full object-cover border-2 border-white bg-neutral-200 dark:bg-neutral-800 dark:border-black rounded-[10px]" :src="node.sourceUrl" />
        </swiper-slide>
      </swiper>
    </div>
    <div
        class="flex lg:p-5 lg:gap-5 flex-col lg:flex-row lg:border lg:border-transparent lg:dark:border-[#262626] lg:rounded-[32px] lg:shadow-[0_1px_20px_rgba(0,0,0,.15)] lg:mt-2.5 select-none">
      <div class="relative">
        <swiper
            :style="{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': 'rgb(0 0 0 / 50%)' }"
            :spaceBetween="4"
            :slidesPerView="1.5"
            :pagination="{ dynamicBullets: true }"
            :navigation="true"
            :modules="modules"
            :thumbs="{ swiper: thumbsSwiper }"
            :class="[
              'lg:h-[530px] xl:h-[600px] lg:rounded-2xl bg-gray-50 dark:bg-neutral-900 transition-all duration-500 ease-in-out',
              isLandscape ? 'lg:w-[700px] xl:w-[800px]' : 'lg:w-[530px] xl:w-[600px]'
            ]"
        >
          <swiper-slide @click="openModal(0)" class="flex items-center justify-center h-full w-full">
            <NuxtImg
                :alt="product.name"
                @load="handleImageLoad($event, 'main')"
                :class="[imageFitClasses['main'] || 'opacity-0', 'h-full w-full transition-opacity duration-300']"
                :src="product.image?.sourceUrl"
            />
          </swiper-slide>

          <swiper-slide
              @click="openModal(i + 1)"
              v-for="(node, i) in product.galleryImages?.nodes"
              :key="i"
              class="flex items-center justify-center h-full w-full"
          >
            <NuxtImg
                :alt="product.name"
                @load="handleImageLoad($event, i)"
                :class="[imageFitClasses[i] || 'opacity-0', 'h-full w-full transition-opacity duration-300']"
                :src="node.sourceUrl"
            />
          </swiper-slide>
        </swiper>
      </div>
      <ImageSliderWithModal
          :product="product"
          v-model="isOpenImageSliderModal"
          :initial-slide="initialSlideIndex"
      />
      <div class="w-full lg:max-w-[28rem]">
        <div class="flex-col flex gap-4 lg:max-h-[530px] xl:max-h-[600px] overflow-hidden">
          <div class="p-3 lg:pb-4 lg:p-0 border-b border-[#efefef] dark:border-[#262626]">
            <h1 class="text-2xl font-semibold mb-1">{{ product.name }}</h1>
            <ProductPrice :sale-price="product.salePrice" :regular-price="product.regularPrice" />
          </div>
          <div class="flex gap-2 px-3 lg:px-0" v-for="(variation, i) in product.productTypes?.nodes" :key="i">
            <div v-for="(vars, i) in variation.products.nodes" :key="i">
              <NuxtLink
                  :to="localePath(`/product/${vars.slug}-${product.sku.split('-')[0]}`)"
                  :class="[
                  'flex w-24 rounded-lg border-2 select-varitaion transition-all duration-200 bg-neutral-200 dark:bg-neutral-800',
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

          <div class="flex flex-col gap-5 pb-6 px-3 lg:px-0 border-b border-[#efefef] dark:border-[#262626]">
            <div class="text-sm font-semibold leading-none flex items-center gap-1.5 opacity-60" v-if="selectedVariation">
              <span>{{ getVariationLabel(selectedVariation) }}:</span>
              <span class="uppercase text-black dark:text-white">{{ getVariationValue(selectedVariation) }}</span>
            </div>
            <div class="flex gap-2 mt-2 mb-4 flex-wrap" v-if="sortedVariations.length > 1">
              <label
                  class="py-1 px-3 rounded-md cursor-pointer select-varitaion border-2 border-[#9b9b9b] dark:border-[#8c8c8c] transition-all duration-200"
                  v-for="variation in sortedVariations"
                  :key="variation.databaseId"
                  :class="[variation.stockStatus === 'OUT_OF_STOCK' ? 'disabled' : '', selectedVariation.databaseId === variation.databaseId ? 'selected-varitaion' : '']">
                <input type="radio" class="hidden" name="variation" :value="variation" :disabled="variation.stockStatus === 'OUT_OF_STOCK'" v-model="selectedVariation" />
                <span class="font-bold uppercase tracking-wide">
                  {{ getVariationValue(variation) }}
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
          <div class="px-3 lg:px-0 flex flex-col h-full overflow-hidden">

            <div class="flex border-b border-[#efefef] dark:border-[#262626] mb-4 sticky top-0 bg-white dark:bg-black z-10">
              <button
                  @click="activeTab = 'description'"
                  class="pb-3 px-1 text-sm font-semibold transition-colors relative mr-6"
                  :class="activeTab === 'description' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >
                {{ $t('product.featured_information') }}
                <span v-if="activeTab === 'description'" class="absolute bottom-0 left-0 w-full h-[2px] bg-alizarin-crimson-700"></span>
              </button>

              <button
                  v-if="specifications.length"
                  @click="activeTab = 'specs'"
                  class="pb-3 px-1 text-sm font-semibold transition-colors relative"
                  :class="activeTab === 'specs' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >
                {{ $t('product.specifications') }}
                <span v-if="activeTab === 'specs'" class="absolute bottom-0 left-0 w-full h-[2px] bg-alizarin-crimson-700"></span>
              </button>
            </div>

            <div class="overflow-y-auto pr-2 custom-scrollbar flex-1">

              <div v-show="activeTab === 'description'">
                <div class="description leading-7 text-sm">
                  <ul>
                    <li class="mb-2">
                      {{ $t('product.free_return') }}
                      <a class="underline" href="#">{{ $t('product.information') }}</a>
                    </li>
                    <li class="mb-4">{{ $t('product.sku') }}: {{ product.sku }}</li>
                    <div v-html="product.description"></div>
                  </ul>
                </div>
              </div>

              <div v-show="activeTab === 'specs'" v-if="specifications.length">
                <dl class="grid grid-cols-1 gap-y-4">
                  <div
                      v-for="attr in specifications"
                      :key="attr.id"
                      class="flex flex-col border-b border-gray-100 dark:border-white/5 pb-2"
                  >
                    <dt class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {{ attr.label }}
                    </dt>
                    <dd class="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {{ attr.options.join(', ') }}
                    </dd>
                  </div>
                </dl>
              </div>

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
  @apply bg-white/50 hover:bg-white p-3.5 m-2 rounded-full flex items-center justify-center shadow transition backdrop-blur-sm;
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
