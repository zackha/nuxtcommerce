<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { isOpenImageSliderModal } = useComponents();
const localePath = useLocalePath();
const modules = [Navigation, Pagination, Thumbs];
const route = useRoute();

const id = computed(() => route.params.id);
const parts = id.value.split('-');
const sku = parts.pop();
const slug = parts.join('-');

const productResult = ref({});
const selectedVariation = ref(null);
const thumbsSwiper = ref(null);
const imageFitClasses = ref({});
const initialSlideIndex = ref(0);
const isLandscape = ref(false);
const activeTab = ref('description');
const showDetails = ref(false);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

onMounted(() => {
  $fetch('/api/product', { query: { slug, sku } })
      .then(data => (productResult.value = data.product));
});

const product = computed(() => productResult.value);

const specifications = computed(() => {
  const variationAttributes = ['pa_color', 'pa_style', 'pa_variant'];
  return product.value.attributes?.nodes?.filter(attr => !variationAttributes.includes(attr.name)) || [];
});

const getVariationValue = (variation) => variation?.attributes?.nodes?.map(a => a.value).join(', ') || '';
const getVariationLabel = (variation) => variation?.attributes?.nodes?.[0]?.label || 'Option';

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
  const isWide = img.naturalWidth > img.naturalHeight;
  if (id === 'main') isLandscape.value = isWide;
  imageFitClasses.value[id] = isWide ? 'object-cover' : 'object-contain p-2';
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

watchEffect(() => {
  if (sortedVariations.value.length > 0 && !selectedVariation.value) {
    const variationInStock = sortedVariations.value.find(v => v.stockStatus === 'IN_STOCK');
    selectedVariation.value = variationInStock || null;
  }
});

const { handleAddToCart, addToCartButtonStatus } = useCart();
</script>

<template>
  <ProductSeo v-if="product?.name" :info="product" />
  <ProductSkeleton v-if="!product.name" />

  <div v-else class="justify-center flex flex-col lg:flex-row lg:mx-5 pb-10">
    <ButtonBack />

    <div class="mr-6 mt-5 pt-2.5 max-xl:hidden shrink-0">
      <swiper :modules="modules" @swiper="setThumbsSwiper" class="product-images-thumbs w-16">
        <swiper-slide
            class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black h-16 w-full bg-neutral-100 dark:bg-neutral-900"
            v-if="product.image">
          <NuxtImg :alt="product.name" class="h-full w-full object-contain rounded-[10px]" :src="product.image.sourceUrl" />
        </swiper-slide>
        <swiper-slide
            class="cursor-pointer rounded-xl overflow-hidden border-2 border-white dark:border-black h-16 w-full bg-neutral-100 dark:bg-neutral-900"
            v-for="(node, i) in product.galleryImages?.nodes" :key="i">
          <NuxtImg :alt="product.name" class="h-full w-full object-contain rounded-[10px]" :src="node.sourceUrl" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="flex flex-col lg:border lg:border-transparent lg:dark:border-[#262626] lg:rounded-[32px] lg:shadow-[0_1px_20px_rgba(0,0,0,.15)] lg:mt-2.5 lg:bg-white lg:dark:bg-black w-full max-w-[1400px]">

      <div class="flex flex-col lg:flex-row lg:p-8 gap-8 lg:gap-12">

        <div
            class="relative shrink-0 mx-auto lg:mx-0 w-full h-[400px] sm:h-[500px] lg:h-[530px] xl:h-[600px] transition-all duration-500 ease-in-out"
            :class="isLandscape ? 'lg:w-[700px] xl:w-[800px]' : 'lg:w-[530px] xl:w-[600px]'"
        >
          <swiper
              :style="{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': 'rgb(0 0 0 / 50%)' }"
              :spaceBetween="4"
              :slidesPerView="1.5"
              :pagination="{ dynamicBullets: true }"
              :navigation="true"
              :modules="modules"
              :thumbs="{ swiper: thumbsSwiper }"
              class="h-full w-full lg:rounded-2xl bg-gray-50 dark:bg-neutral-900 select-none"
          >
            <swiper-slide @click="openModal(0)" class="flex items-center justify-center h-full w-full cursor-pointer">
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
                class="flex items-center justify-center h-full w-full cursor-pointer"
            >
              <NuxtImg
                  :alt="product.name"
                  @load="handleImageLoad($event, i)"
                  :class="[imageFitClasses[i] || 'opacity-0', 'h-full w-full transition-opacity duration-300']"
                  :src="node.sourceUrl"
              />
            </swiper-slide>
          </swiper>

          <ImageSliderWithModal :product="product" v-model="isOpenImageSliderModal" :initial-slide="initialSlideIndex" />
        </div>

        <div class="w-full flex flex-col flex-1 min-w-0 px-3 lg:px-0">
          <div class="border-b border-[#efefef] dark:border-[#262626] pb-4 mb-5">
            <h1 class="text-2xl lg:text-3xl font-bold mb-2 tracking-tight">{{ product.name }}</h1>
            <ProductPrice :sale-price="product.salePrice" :regular-price="product.regularPrice" class="text-lg" />
          </div>

          <div class="flex flex-col gap-6 mb-auto">

            <div class="flex flex-wrap gap-3" v-if="product.productTypes?.nodes?.length">
              <div v-for="(typeNode, i) in product.productTypes.nodes" :key="i" class="contents">
                <div v-for="(vars, j) in typeNode.products.nodes" :key="j" class="contents">
                  <NuxtLink
                      :to="localePath(`/product/${vars.slug}-${product.sku.split('-')[0]}`)"
                      :class="[
                       'flex flex-col w-24 rounded-lg border-2 select-varitaion transition-all duration-200 bg-neutral-100 dark:bg-neutral-800 p-1 gap-1.5',
                      vars.allPaColor.nodes[0].name === product.allPaColor.nodes[0].name
                        ? 'border-black dark:border-white ring-1 ring-black dark:ring-white'
                        : 'border-transparent hover:border-gray-300',
                    ]">

                                <div class="w-full aspect-square rounded-md overflow-hidden bg-white dark:bg-black/10">
                                  <NuxtImg
                                      :alt="vars.allPaColor.nodes[0].name"
                                      :src="vars.image.sourceUrl"
                                      :title="vars.allPaColor.nodes[0].name"
                                      class="w-full h-full object-cover" />
                                </div>

                                <span class="text-[10px] font-bold uppercase text-center leading-tight truncate w-full opacity-80 px-0.5">
                       {{ vars.allPaColor.nodes[0].name }}
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div>
              <div class="text-sm font-medium flex items-center gap-2 mb-2" v-if="selectedVariation">
                <span class="opacity-60">{{ getVariationLabel(selectedVariation) }}:</span>
                <span class="font-bold uppercase">{{ getVariationValue(selectedVariation) }}</span>
              </div>
              <div class="flex flex-wrap gap-2.5" v-if="sortedVariations.length > 1">
                <label v-for="variation in sortedVariations" :key="variation.databaseId" class="group relative">
                  <input type="radio" class="peer hidden" name="variation" :value="variation" :disabled="variation.stockStatus === 'OUT_OF_STOCK'" v-model="selectedVariation" />
                  <div class="px-4 py-2.5 rounded-lg border-2 text-sm font-bold uppercase transition-all duration-200 cursor-pointer select-none
                    peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                    dark:peer-checked:border-white dark:peer-checked:bg-white dark:peer-checked:text-black
                    peer-disabled:opacity-30 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:border-gray-200
                    border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-900">
                    {{ getVariationValue(variation) }}
                  </div>
                </label>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                  @click="handleAddToCart(selectedVariation.databaseId)"
                  :disabled="addToCartButtonStatus !== 'add'"
                  class="button-bezel flex-1 h-12 rounded-xl relative font-bold text-white tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                <Transition name="slide-up">
                  <div v-if="addToCartButtonStatus === 'add'">{{ $t('cart.add_to_cart') }}</div>
                  <UIcon v-else-if="addToCartButtonStatus === 'loading'" name="i-svg-spinners-90-ring-with-bg" size="24" />
                  <div v-else-if="addToCartButtonStatus === 'added'">{{ $t('cart.added_to_cart') }}!</div>
                </Transition>
              </button>
              <ButtonWishlist :product="product"/>
            </div>

            <div
                class="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 mt-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                @click="activeTab = 'return_policy'; showDetails = true;"
            >
              <UIcon name="i-iconamoon-check-circle-1-fill" class="text-green-500 shrink-0" size="18" />
              <span>{{ $t('product.free_return') }}</span>
            </div>

            <div v-if="product.shortDescription" class="mt-2 px-1">
              <div class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3" v-html="product.shortDescription"></div>
            </div>

            <div class="flex justify-center mt-2">
              <button
                  @click="toggleDetails"
                  class="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors py-2"
              >
                <span>{{ showDetails ? $t('general.show_less') : $t('product.featured_information') }}</span>
                <UIcon
                    name="i-iconamoon-arrow-down-2"
                    size="18"
                    class="transition-transform duration-300"
                    :class="{ 'rotate-180': showDetails }"
                />
              </button>
            </div>

          </div>
        </div>
      </div>

      <Transition
          enter-active-class="transition-all duration-500 ease-in-out overflow-hidden"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[2000px] opacity-100"
      >
        <div v-if="showDetails">
          <hr class="border-t border-[#efefef] dark:border-[#262626] mx-3 lg:mx-8" />

          <div class="px-3 lg:px-8 py-6 lg:pb-8">
            <div class="flex border-b border-gray-200 dark:border-neutral-800 mb-6 gap-8">
              <button
                  @click="activeTab = 'description'"
                  class="pb-3 px-1 text-sm font-bold transition-all relative"
                  :class="activeTab === 'description' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >
                {{ $t('product.featured_information') }}
                <span v-if="activeTab === 'description'" class="absolute bottom-0 left-0 w-full h-[2px] bg-alizarin-crimson-700"></span>
              </button>

              <button
                  v-if="specifications.length"
                  @click="activeTab = 'specs'"
                  class="pb-3 px-1 text-sm font-bold transition-all relative"
                  :class="activeTab === 'specs' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >
                {{ $t('product.specifications') }}
                <span v-if="activeTab === 'specs'" class="absolute bottom-0 left-0 w-full h-[2px] bg-alizarin-crimson-700"></span>
              </button>

              <button
                  @click="activeTab = 'return_policy'"
                  class="pb-3 px-1 text-sm font-bold transition-all relative"
                  :class="activeTab === 'return_policy' ? 'text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >
                {{ $t('product.shipping_returns') || 'Verzending & Retour' }}
                <span v-if="activeTab === 'return_policy'" class="absolute bottom-0 left-0 w-full h-[2px] bg-alizarin-crimson-700"></span>
              </button>
            </div>

            <div>
              <Transition name="fade" mode="out-in">

                <div v-if="activeTab === 'description'" key="desc" class="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 description select-text max-w-4xl">
                  <div v-html="product.description"></div>
                </div>

                <div v-else-if="activeTab === 'specs'" key="specs" class="select-text max-w-4xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    <div v-for="attr in specifications" :key="attr.id" class="flex justify-between py-2 border-b border-gray-100 dark:border-neutral-800 items-center">
                      <span class="text-neutral-500 font-medium">{{ attr.label }}</span>
                      <span class="font-bold text-right text-black dark:text-white">{{ attr.options.join(', ') }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 'return_policy'" key="return_policy" class="select-text max-w-4xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  <h4 class="font-bold text-black dark:text-white mb-2">{{ $t('product.return_policy_title') }}</h4>

                  <p class="mb-6">
                    {{ $t('product.return_policy_text') }}
                  </p>

                  <h4 class="font-bold text-black dark:text-white mb-2">{{ $t('product.article_details') }}</h4>
                  <div class="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span>{{ $t('product.sku') }}:</span>
                    <span class="font-mono font-bold select-all text-black dark:text-white">{{ product.sku }}</span>
                  </div>
                </div>

              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>

  <div class="text-lg lg:text-xl lg:text-center font-semibold mt-10 px-3">{{ $t('product.shop_similar') }}</div>
  <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 px-3 lg:px-5 xl:px-8 mt-4 lg:mt-5 mb-10">
    <ProductCard :products="product.related?.nodes" />
    <ProductsSkeleton v-if="!product.name" />
  </div>
</template>

<style lang="postcss">
.product-images-thumbs .swiper-wrapper { @apply flex-col gap-3; }
.product-images-thumbs .swiper-slide-thumb-active { @apply border-black dark:border-white ring-2 ring-offset-2 ring-transparent dark:ring-offset-black; }
.swiper-button-next, .swiper-button-prev { @apply bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black p-4 m-2 rounded-full flex items-center justify-center shadow-md transition backdrop-blur-md text-black dark:text-white h-10 w-10 after:text-sm; }
.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled { @apply opacity-0 pointer-events-none; }
.swiper-pagination { @apply !bottom-4; }
.swiper-pagination-bullet { @apply !bg-white/80 !opacity-50 transition-all; }
.swiper-pagination-bullet-active { @apply !bg-white !opacity-100 !w-6 rounded-full; }

.button-bezel {
  background: theme('colors.alizarin-crimson.700');
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.1);
  @apply hover:bg-alizarin-crimson-600 transition-colors;
}

.description ul { @apply list-disc list-inside space-y-1 ml-2; }
.description p { @apply mb-3 last:mb-0; }
.description h3 { @apply text-lg font-bold mt-4 mb-2 text-black dark:text-white; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>