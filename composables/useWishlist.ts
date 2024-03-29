export const useWishlist = (product: any) => {
  const wishlist = ref<any[]>([]);

  const isWishlisted = computed(() => wishlist.value.some((item) => item.databaseId === product.databaseId));

  const updateLocalStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  };

  const toggleWishlist = (item: any) => {
    if (isWishlisted.value) {
      wishlist.value = wishlist.value.filter((item) => item.databaseId !== product.databaseId);
    } else {
      wishlist.value.push(item);
    }
    updateLocalStorage();
  };

  const removeFromList = (databaseId: number) => {
    wishlist.value = wishlist.value.filter((item) => item.databaseId !== databaseId);
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
