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
      <div class="">
        <div class="">
          <h1 class="text-2xl">{{ product.name }}</h1>
          <h1 class="text-2xl" v-html="product.regularPrice"></h1>
          <h1 class="text-2xl" v-html="product.salePrice"></h1>
          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed tincidunt augue. Maecenas ac mauris sed magna auctor lacinia. Etiam nec suscipit felis. Quisque
            tempus mi sed commodo eleifend. Pellentesque a ipsum eu lectus auctor imperdiet. Mauris ultricies, metus vitae commodo scelerisque, nibh tellus condimentum turpis,
            vitae tristique sapien urna sit amet risus. Donec maximus, est eget molestie accumsan, sapien enim fringilla nisl, vel iaculis mi odio eu massa. Phasellus at vulputate
            diam, ullamcorper ullamcorper metus. Nulla facilisi. Maecenas quis pretium sapien, vel dignissim nibh. Aliquam risus libero, imperdiet sed elit et, condimentum commodo
            sapien. Nunc vulputate sollicitudin massa, quis ullamcorper elit ultricies in. Pellentesque at orci in lectus faucibus vestibulum. Integer fringilla purus turpis, at
            ullamcorper velit suscipit ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>
      </div>
    </div>
  </div>
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
