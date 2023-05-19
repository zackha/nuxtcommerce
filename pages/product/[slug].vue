<template>
  <div>
    <div v-if="loading">loading......</div>
    <div v-else>
      {{ product?.name }}
      <NuxtImg :src="product?.image.sourceUrl" />
    </div>
    <button @click="useRouter().go(-1)">Back</button>
  </div>
</template>

<script setup>
import getProduct from '~/gql/queries/getProduct.gql';

const { result: productResult, loading } = useQuery(getProduct, () => ({ slug: useRoute().params.slug }));
const product = computed(() => productResult.value?.product);
console.log(product.value?.name);

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
</script>
