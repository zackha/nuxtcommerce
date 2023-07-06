import getProducts from '~/gql/queries/getProducts.gql';

export const useProducts = () => {
  const route = useRoute();
  const variables = computed(() => ({
    search: route.query.q,
    order: route.query.orderby || 'DESC',
    field: route.query.fieldby || 'DATE',
    category: route.query.category,
  }));

  const { result: productsResult, loading, fetchMore } = useQuery(getProducts, () => variables.value);
  const products = computed(() => productsResult.value?.products.nodes);
  const productsEmpty = computed(() => productsResult.value?.products.nodes.length);

  const mergeData = (prev, { fetchMoreResult }) => {
    const mergedData = {
      ...prev,
      products: {
        ...prev.products,
        nodes: [...prev.products.nodes, ...fetchMoreResult.products.nodes],
        pageInfo: fetchMoreResult.products.pageInfo,
      },
    };
    return mergedData;
  };

  const loadMore = async () => {
    if (productsResult.value?.products.pageInfo.hasNextPage && !loading.value) {
      await fetchMore({
        variables: {
          after: productsResult.value?.products.pageInfo.endCursor,
        },
        updateQuery: mergeData,
      });
    }
  };

  const shouldLoadMore = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const loadMorePosition = document.documentElement.scrollHeight - 1600;
    return scrollPosition >= loadMorePosition;
  };

  const handleScroll = () => {
    if (shouldLoadMore()) {
      loadMore();
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    products,
    loading,
    productsEmpty,
  };
};
