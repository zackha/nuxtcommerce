export const useCart = () => {
  const cart = useState('cart', () => []);
  const addToCartButtonStatus = ref('add');
  const removeFromCartButtonStatus = ref('remove');
  const { push } = useNotivue();
  const findItemByVariationId = id => cart.value.find(i => i?.variation?.node?.databaseId === id);

  const handleAddToCart = productId => {
    addToCartButtonStatus.value = 'loading';

    $fetch('/api/cart/add', {
      method: 'POST',
      body: { productId },
    })
      .then(res => {
        updateCart([...cart.value, res.addToCart.cartItem]);
        addToCartButtonStatus.value = 'added';
        setTimeout(() => (addToCartButtonStatus.value = 'add'), 2000);
      })
      .catch(err => {
        addToCartButtonStatus.value = 'add';
        const errorMessage = err.response.errors[0].message
          .replace(/<a[^>]*>(.*?)<\/a>/g, '')
          .replace(/&mdash;/g, '—')
          .trim();
        push.error(errorMessage);
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
    if (quantity > 0) {
      const idx = cart.value.findIndex(i => i.key === key);
      cart.value[idx].quantity = quantity;
      updateCart([...cart.value]);
    } else {
      updateCart(cart.value.filter(i => i.key !== key));
    }
  };

  const increment = id => {
    const item = findItemByVariationId(id);
    item ? changeQty(item.key, item.quantity + 1) : handleAddToCart(id);
  };

  const decrement = id => {
    const item = findItemByVariationId(id);
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
