// app/composables/useCart.ts
import { push } from 'notivue';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);
  const addToCartButtonStatus = ref<AddBtnStatus>('add');
  const removeFromCartButtonStatus = ref<RemoveBtnStatus>('remove');

  const findItem = (variationId: number) => cart.value.find(i => i.variation?.node?.databaseId === variationId);

  const updateCart = (next: CartItem[]) => {
    cart.value = next;
    if (process.client) localStorage.setItem('cart', JSON.stringify(next));
  };

  const handleAddToCart = async (productId: number) => {
    try {
      addToCartButtonStatus.value = 'loading';
      const res = await $fetch<AddToCartResponse>('/api/cart/add', { method: 'POST', body: { productId } });
      const incoming = res.addToCart.cartItem;
      const idx = cart.value.findIndex(i => i.key === incoming.key);

      if (idx > -1) {
        const merged = { ...cart.value[idx], ...incoming };
        if (typeof incoming.variation?.node?.stockQuantity === 'number') {
          merged.variation.node.stockQuantity = incoming.variation.node.stockQuantity;
        }
        updateCart([...cart.value.slice(0, idx), merged, ...cart.value.slice(idx + 1)]);
      } else {
        updateCart([...cart.value, incoming]);
      }

      addToCartButtonStatus.value = 'added';
      setTimeout(() => (addToCartButtonStatus.value = 'add'), 2000);
    } catch {
      addToCartButtonStatus.value = 'add';
      push.error('Insufficient stock');
    }
  };

  const changeQty = (key: string, quantity: number) => {
    $fetch('/api/cart/update', { method: 'POST', body: { items: [{ key, quantity }] } });
    updateCart(quantity <= 0 ? cart.value.filter(i => i.key !== key) : cart.value.map(i => (i.key === key ? { ...i, quantity } : i)));
  };

  const handleRemoveFromCart = (key: string) => {
    try {
      removeFromCartButtonStatus.value = 'loading';
      changeQty(key, 0);
    } finally {
      removeFromCartButtonStatus.value = 'remove';
    }
  };

  const increment = (variationId: number) => {
    const item = findItem(variationId);
    if (!item) return handleAddToCart(variationId);
    const max = item.variation?.node?.stockQuantity ?? Infinity;
    if (item.quantity >= max) return push.error('Insufficient stock');
    changeQty(item.key, item.quantity + 1);
  };

  const decrement = (variationId: number) => {
    const item = findItem(variationId);
    if (item) changeQty(item.key, item.quantity - 1);
  };

  onMounted(() => {
    if (!process.client) return;
    const stored = localStorage.getItem('cart');
    if (!stored) return;
    try {
      updateCart(JSON.parse(stored) as CartItem[]);
    } catch {
      updateCart([]);
    }
  });

  return {
    cart,
    addToCartButtonStatus,
    removeFromCartButtonStatus,
    handleAddToCart,
    handleRemoveFromCart,
    increment,
    decrement,
  };
};
