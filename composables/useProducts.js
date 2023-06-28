import getProducts from '~/gql/queries/getProducts.gql';
import getCategories from '~/gql/queries/getCategories.gql';

export default function useProducts() {
  const isDropdownSortBy = ref(false);
  const isDropdownCategory = ref(false);
  const router = useRouter();
  const route = useRoute();
  const selectedCategory = ref(route.query.category || '');
  const sortByOrder = ref(route.query.orderby && route.query.orderby !== '' ? route.query.orderby : 'DESC');
  const sortByField = ref(route.query.fieldby && route.query.fieldby !== '' ? route.query.fieldby : 'DATE');
  const variables = ref({
    search: route.query.q,
    category: selectedCategory,
    order: sortByOrder,
    field: sortByField,
  });

  const { result: categoriesResult } = useQuery(getCategories);
  const { result: productsResult, loading, fetchMore } = useQuery(getProducts, () => variables.value);
  const products = computed(() => productsResult.value?.products.nodes);
  const empty = computed(() => productsResult.value?.products.nodes.length);
  const pageInfo = computed(() => productsResult.value?.products.pageInfo);
  const categories = computed(() => categoriesResult.value?.productCategories.nodes.filter((categories) => categories.products.nodes.length && categories.children.nodes.length));

  const options = reactive([{ value: 'Newest' }, { value: 'Price: High to Low' }, { value: 'Price: Low to High' }]);

  const selectedOption = ref(sortByOrder.value === 'DESC' && sortByField.value === 'DATE' ? 'Newest' : sortByOrder.value === 'DESC' ? 'Price: High to Low' : 'Price: Low to High');

  const loadMore = () => {
    fetchMore({
      variables: {
        after: pageInfo.value?.endCursor,
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

    if (scrollPosition >= loadMorePosition && pageInfo.value?.hasNextPage && !loading.value) {
      loadMore();
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      isDropdownSortBy.value = false;
      isDropdownCategory.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleClickOutside);
  });

  watch([selectedOption, selectedCategory], ([newSelectedOption, newCategory]) => {
    let updatedQuery = {
      ...route.query,
      category: newCategory || undefined,
    };

    switch (newSelectedOption) {
      case 'Newest':
        sortByOrder.value = 'DESC';
        sortByField.value = 'DATE';
        updatedQuery = {
          ...updatedQuery,
          orderby: undefined,
          fieldby: undefined,
        };
        break;
      case 'Price: High to Low':
        sortByOrder.value = 'DESC';
        sortByField.value = 'PRICE';
        updatedQuery = {
          ...updatedQuery,
          orderby: sortByOrder.value || undefined,
          fieldby: sortByField.value || undefined,
        };
        break;
      case 'Price: Low to High':
        sortByOrder.value = 'ASC';
        sortByField.value = 'PRICE';
        updatedQuery = {
          ...updatedQuery,
          orderby: sortByOrder.value || undefined,
          fieldby: sortByField.value || undefined,
        };
        break;
    }
    router.push({
      query: updatedQuery,
    });
  });

  return {
    products,
    empty,
    loading,
    categories,
    options,
    selectedCategory,
    selectedOption,
    isDropdownSortBy,
    isDropdownCategory,
  };
}
