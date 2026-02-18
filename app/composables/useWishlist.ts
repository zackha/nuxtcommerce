const WISHLIST_STORAGE_KEY = 'wishlist';

export const useWishlist = (product?: WishlistItem | null) => {
  const wishlist = useState<WishlistItem[]>('wishlist', () => []);

  const isWishlisted = computed(() => {
    if (!product) return false;
    return wishlist.value.some(item => item.databaseId === product.databaseId);
  });

  const persistWishlist = () => {
    if (!process.client) return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.value));
  };

  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlist.value.some(existing => existing.databaseId === item.databaseId);

    wishlist.value = exists
      ? wishlist.value.filter(existing => existing.databaseId !== item.databaseId)
      : [...wishlist.value, item];

    persistWishlist();
  };

  const removeFromList = (databaseId: number) => {
    wishlist.value = wishlist.value.filter(item => item.databaseId !== databaseId);
    persistWishlist();
  };

  onMounted(() => {
    if (!process.client) return;
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as WishlistItem[];
      wishlist.value = Array.isArray(parsed) ? parsed : [];
    } catch {
      wishlist.value = [];
    }
  });

  return {
    isWishlisted,
    toggleWishlist,
    removeFromList,
    wishlist,
  };
};
