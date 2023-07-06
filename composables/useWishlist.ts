interface Product {
  databaseId: number;
  name: string;
}

export const useWishlist = () => {
  const products = ref<Product[]>([
    { databaseId: 1, name: 'Product 1' },
    { databaseId: 2, name: 'Product 2' },
    { databaseId: 3, name: 'Product 3' },
  ]);

  const wishlist = ref<number[]>([]);

  onMounted(() => {
    if (process.client) {
      const storedWishlist = window.localStorage.getItem('wishlist');
      if (storedWishlist) {
        wishlist.value = JSON.parse(storedWishlist);
      }
    }
  });

  const toggleWishlist = (id: number) => {
    const index = wishlist.value.indexOf(id);
    if (index !== -1) {
      wishlist.value.splice(index, 1);
    } else {
      wishlist.value.push(id);
    }

    if (process.client) {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
    }
  };

  const wishlistProducts = computed(() => {
    let result: { [id: number]: Product } = {};
    for (let id of wishlist.value) {
      let product = products.value.find((product) => product.databaseId === id);
      if (product) {
        result[id] = product;
      }
    }
    return result;
  });

  const inWishlist = computed(() => {
    let result: { [id: number]: boolean } = {};
    for (let product of products.value) {
      result[product.databaseId] = wishlist.value.includes(product.databaseId);
    }
    return result;
  });

  return {
    products,
    toggleWishlist,
    wishlistProducts,
    inWishlist,
    wishlist,
  };
};
