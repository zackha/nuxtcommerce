<script setup lang="ts">
import {computed} from 'vue';

type PriceVariant = 'default' | 'card' | 'cart';

interface Props {
  salePrice: string;
  regularPrice: string;
  variant?: PriceVariant;
  quantity?: number; // Add the optional quantity prop
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  quantity: 1,
});

const parsePrice = (priceString: string | undefined): number => {
  if (!priceString) return 0;
  return parseFloat(String(priceString).replace(/[^0-9.]/g, ''));
};

const totalSalePrice = computed(() => parsePrice(props.salePrice) * props.quantity);
const totalRegularPrice = computed(() => parsePrice(props.regularPrice) * props.quantity);

const isSale = computed(() => {
  const sale = parsePrice(props.salePrice);
  const regular = parsePrice(props.regularPrice);
  return sale > 0 && regular > 0 && sale < regular;
});

const discountPercentage = computed(() => {
  if (!isSale.value) return 0;
  const sale = parsePrice(props.salePrice);
  const regular = parsePrice(props.regularPrice);
  return Math.round(((regular - sale) / regular) * 100);
});
</script>

<template>
  <div>
    <div v-if="variant === 'default'">
      <div v-if="isSale">
        <div class="flex items-baseline">
          <p class="text-xl font-bold text-alizarin-crimson-700" v-html="salePrice"></p>
          <p class="text-sm ml-2">{{ $t('product.vat_included') }}</p>
        </div>
        <div class="flex items-baseline">
          <p class="text-sm">{{ $t('product.originally') }}:</p>
          <p class="text-sm ml-1 line-through" v-html="regularPrice"></p>
          <p class="text-sm ml-1 text-alizarin-crimson-700">-{{ discountPercentage }}%</p>
        </div>
      </div>
      <div v-else>
        <div class="flex items-baseline">
          <p class="text-xl font-bold" v-html="regularPrice"></p>
          <p class="text-sm ml-2">{{ $t('product.vat_included') }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="variant === 'card'" class="flex gap-2 text-sm">
      <template v-if="isSale">
        <span v-html="salePrice"></span>
        <span class="line-through text-white/50" v-html="regularPrice"></span>
      </template>
      <template v-else>
        <span v-html="regularPrice"></span>
      </template>
    </div>

    <div v-else-if="variant === 'cart'">
      <div v-if="isSale">
        <div class="font-bold">${{ totalSalePrice.toFixed(2) }}</div>
        <div class="flex-wrap text-neutral-600 dark:text-neutral-300 items-baseline text-xs gap-1 flex-row flex">
          <p>{{ $t('product.originally') }}:</p>
          <p class="line-through">${{ totalRegularPrice.toFixed(2) }}</p>
          <p class="text-alizarin-crimson-700">-{{ discountPercentage }}%</p>
        </div>
      </div>
      <div v-else>
        <div class="font-bold">${{ totalRegularPrice.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>