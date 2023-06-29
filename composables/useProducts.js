import getProducts from '~/gql/queries/getProducts.gql';

export function useProducts() {
  const route = useRoute();
  const variables = computed(() => ({
    search: route.query.q,
  }));

  const { result: productsResult, loading, fetchMore } = useQuery(getProducts, () => variables.value);
  const products = computed(() => productsResult.value?.products.nodes);

  const loadMore = () => {
    fetchMore({
      variables: {
        after: productsResult.value?.products.pageInfo.endCursor,
      },
      updateQuery(prev, { fetchMoreResult }) {
        const mergedData = {
          ...prev,
        };
        mergedData.products = {
          ...prev.products,
          nodes: [...prev.products.nodes, ...fetchMoreResult.products.nodes],
        };
        mergedData.products.pageInfo = fetchMoreResult.products.pageInfo;
        return mergedData;
      },
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const loadMorePosition = document.documentElement.scrollHeight - 1600;

    if (scrollPosition >= loadMorePosition && productsResult.value?.products.pageInfo.hasNextPage && !loading.value) {
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
  };
}
