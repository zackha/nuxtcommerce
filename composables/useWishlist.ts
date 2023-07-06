export const useWishlist = (product: { databaseId: number }) => {
  const wishlist = ref([]);

  const isWishlisted = computed(() => wishlist.value.some((item: { databaseId: number }) => item.databaseId === product.databaseId));

  const updateLocalStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  };

  const toggleWishlist = (item: { databaseId: number }) => {
    if (isWishlisted.value) {
      wishlist.value = wishlist.value.filter((item: { databaseId: number }) => item.databaseId !== product.databaseId);
    } else {
      wishlist.value.push(item);
    }
    updateLocalStorage();
  };

  const removeFromList = (databaseId: number) => {
    wishlist.value = wishlist.value.filter((item: { databaseId: number }) => item.databaseId !== databaseId);
    updateLocalStorage();
  };

  onMounted(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist);
    }
  });

  return { isWishlisted, toggleWishlist, removeFromList, wishlist };
};
