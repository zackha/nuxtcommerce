<script setup lang="ts">
type ProductInfo = {
  name: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  image?: { sourceUrl?: string };
};

const props = defineProps({
  info: { type: Object as PropType<ProductInfo>, required: true },
});

const stripHtml = (html?: string) =>
  (html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const { site } = useAppConfig() as any;
const siteName: string = site?.name || 'NuxtCommerce';

const route = useRoute();
const url = useRequestURL();
const { locales, locale } = useI18n();
const localePath = useLocalePath();

const canonical = `${url.origin}${url.pathname}`;

const img = useImage();
const baseImage: string = props.info.image?.sourceUrl || '/images/placeholder.jpg';
const ogSrc = img.getSizes(baseImage, { width: 1200, height: 630 }).src;
const twSrc = img.getSizes(baseImage, { width: 1600, height: 900 }).src;
const absolutize = (u?: string) => (!u ? '' : u.startsWith('http') ? u : `${url.origin}${u}`);
const ogImage = absolutize(ogSrc);
const twitterImage = absolutize(twSrc);

const rawDescription = props.info.shortDescription && stripHtml(props.info.shortDescription) ? stripHtml(props.info.shortDescription) : stripHtml(props.info.description);
const description = rawDescription?.slice(0, 160) || '';

const alternates = computed(() => {
  const items: Array<{ href: string; hreflang: string }> = [];
  const codes = (locales.value as any[]).map(l => ({ code: l.code, iso: l.iso }));
  for (const l of codes) {
    const localizedPath = localePath(route.fullPath, l.code);
    items.push({ href: `${url.origin}${localizedPath}`, hreflang: l.iso || l.code });
  }
  items.push({ href: `${url.origin}${localePath(route.fullPath, locale.value)}`, hreflang: 'x-default' });
  return items;
});

const productSchema = computed(() => {
  const images = [ogImage].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.info.name,
    description,
    image: images,
    sku: props.info.sku || undefined,
    brand: { '@type': 'Brand', name: siteName },
  };
});

useSeoMeta({
  title: props.info.name,
  description,
  ogTitle: props.info.name,
  ogDescription: description,
  ogType: 'article',
  ogImage,
  ogUrl: canonical,
  ogSiteName: siteName,
  twitterTitle: props.info.name,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage,
});

useHead({
  htmlAttrs: { lang: locale.value },
  link: [{ rel: 'canonical', href: canonical }, ...alternates.value.map(a => ({ rel: 'alternate', href: a.href, hreflang: a.hreflang }))],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(productSchema.value) }],
});
</script>

<template>
  <slot />
</template>
