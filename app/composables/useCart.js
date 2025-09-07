export const useCart = () => {
  const cart = useState('cart', () => []);
  const addToCartButtonStatus = ref('add');
  const removeFromCartButtonStatus = ref('remove');

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
  };
};
