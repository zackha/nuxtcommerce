import { push } from 'notivue';

const CART_STORAGE_KEY = 'cart';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);
  const addToCartButtonStatus = ref<AddBtnStatus>('add');

  const persistCart = () => {
    if (!process.client) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.value));
  };

  const setCart = (items: CartItem[]) => {
    cart.value = items;
    persistCart();
  };

  const findItem = (variationId: number) => {
    return cart.value.find(item => item.variation?.node?.databaseId === variationId);
  };

  const handleAddToCart = async (productId: number) => {
    addToCartButtonStatus.value = 'loading';

    try {
      const response = await $fetch<AddToCartResponse>('/api/cart/add', {
        method: 'POST',
        body: { productId },
      });
      const incoming = response.addToCart.cartItem;
      const itemIndex = cart.value.findIndex(item => item.key === incoming.key);

      if (itemIndex >= 0) {
        const next = [...cart.value];
        next[itemIndex] = incoming;
        setCart(next);
      } else {
        setCart([...cart.value, incoming]);
      }

      addToCartButtonStatus.value = 'added';
      setTimeout(() => {
        addToCartButtonStatus.value = 'add';
      }, 2000);
    } catch {
      addToCartButtonStatus.value = 'add';
      push.error('Insufficient stock');
    }
  };

  const changeQuantity = (key: string, quantity: number) => {
    const next =
      quantity <= 0
        ? cart.value.filter(item => item.key !== key)
        : cart.value.map(item => (item.key === key ? { ...item, quantity } : item));

    setCart(next);
    void $fetch('/api/cart/update', {
      method: 'POST',
      body: { items: [{ key, quantity }] },
    });
  };

  const increment = (variationId: number) => {
    const item = findItem(variationId);

    if (!item) {
      void handleAddToCart(variationId);
      return;
    }

    const maxStock = item.variation?.node?.stockQuantity;
    if (typeof maxStock === 'number' && item.quantity >= maxStock) {
      push.error('Insufficient stock');
      return;
    }

    changeQuantity(item.key, item.quantity + 1);
  };

  const decrement = (variationId: number) => {
    const item = findItem(variationId);
    if (!item) return;
    changeQuantity(item.key, item.quantity - 1);
  };

  onMounted(() => {
    if (!process.client) return;
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  });

  return {
    cart,
    addToCartButtonStatus,
    handleAddToCart,
    increment,
    decrement,
  };
};
