import { push } from 'notivue';

export const useCart = () => {
  const cart = useState('cart', () => []);
  const addToCartButtonStatus = ref('add');
  const removeFromCartButtonStatus = ref('remove');
  const findItem = id => cart.value.find(i => i?.variation?.node?.databaseId === id);

  const handleAddToCart = productId => {
    addToCartButtonStatus.value = 'loading';
    $fetch('/api/cart/add', { method: 'POST', body: { productId } })
      .then(res => {
        const incoming = res.addToCart.cartItem;
        const existing = cart.value.find(i => i.key === incoming.key);
        if (existing) {
          existing.quantity = incoming.quantity;
          if (typeof incoming?.variation?.node?.stockQuantity === 'number') {
            existing.variation.node.stockQuantity = incoming.variation.node.stockQuantity;
          }
          updateCart([...cart.value]);
        } else {
          updateCart([...cart.value, incoming]);
        }
        addToCartButtonStatus.value = 'added';
        setTimeout(() => (addToCartButtonStatus.value = 'add'), 2000);
      })
      .catch(err => {
        addToCartButtonStatus.value = 'add';
        push.error('Insufficient stock');
      });
  };

  const handleRemoveFromCart = key => {
    removeFromCartButtonStatus.value = 'loading';
    $fetch('/api/cart/update', {
      method: 'POST',
      body: { items: [{ key, quantity: 0 }] },
    }).then(() => {
      removeFromCartButtonStatus.value = 'remove';
      updateCart(cart.value.filter(item => item.key !== key));
    });
  };

  const updateCart = newCart => {
    cart.value = newCart;
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const changeQty = (key, quantity) => {
    $fetch('/api/cart/update', { method: 'POST', body: { items: [{ key, quantity }] } });
    updateCart(quantity > 0 ? cart.value.map(i => (i.key === key ? { ...i, quantity } : i)) : cart.value.filter(i => i.key !== key));
  };

  const increment = id => {
    const item = findItem(id);
    if (item.quantity >= (item?.variation?.node?.stockQuantity ?? Infinity)) return push.error('Insufficient stock');
    changeQty(item.key, item.quantity + 1);
  };

  const decrement = id => {
    const item = findItem(id);
    if (item) changeQty(item.key, item.quantity - 1);
  };

  onMounted(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) cart.value = JSON.parse(storedCart);
  });

  return {
    cart,
    handleAddToCart,
    addToCartButtonStatus,
    handleRemoveFromCart,
    removeFromCartButtonStatus,
    increment,
    decrement,
  };
};
