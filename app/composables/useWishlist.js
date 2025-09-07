export const useWishlist = product => {
  const wishlist = useState('wishlist', () => []);

  const isWishlisted = computed(() =>
    product ? wishlist.value.some(item => item.databaseId === product.databaseId) : false
  );

  const updateLocalStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
  };

  const toggleWishlist = item => {
    if (isWishlisted.value) {
      wishlist.value = wishlist.value.filter(
        existingItem => existingItem.databaseId !== item.databaseId
      );
    } else {
      wishlist.value.push(item);
    }
    updateLocalStorage();
  };

  const removeFromList = databaseId => {
    wishlist.value = wishlist.value.filter(item => item.databaseId !== databaseId);
    updateLocalStorage();
  };

  onMounted(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist);
    }
  });

  return {
    isWishlisted,
    toggleWishlist,
    removeFromList,
    wishlist,
  };
};
