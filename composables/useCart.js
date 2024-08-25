export const useCart = () => {
  const cart = useState('cart', () => []);

  const handleAddToCart = productId => {
    productId ? addToCart({ productId }).then(res => updateCart([...cart.value, res.addToCart.cartItem])) : alert('Please select a size');
  };

  const handleRemoveFromCart = key => {
    updateItemQuantities({ items: [{ key, quantity: 0 }] }).then(() => updateCart(cart.value.filter(item => item.key !== key)));
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
    handleRemoveFromCart,
  };
};
