<template>
  <div v-if="loading">loading...</div>
  <div v-else>
    <NuxtImg :src="product.image.sourceUrl" />
  </div>
  <ButtonBack />
</template>

<script setup>
const route = useRoute();
import { getProduct } from '~/gql/queries/getProduct.gql';

const { result: productResult, loading } = useQuery(getProduct, () => ({ slug: route.params.slug }));
const product = computed(() => productResult.value?.product);

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
