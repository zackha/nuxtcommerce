export const useCart = () => {
  const cart = useState('cart', () => []);
  const buttonText = ref('add');

  const handleAddToCart = productId => {
    buttonText.value = 'loading';

    addToCart({ productId })
      .then(res => {
        updateCart([...cart.value, res.addToCart.cartItem]);
        buttonText.value = 'added';
        setTimeout(() => (buttonText.value = 'add'), 2000);
      })
      .catch(err => {
        buttonText.value = 'add';
        alert(JSON.stringify(err.response.errors[0].message.replace(/<a[^>]*>(.*?)<\/a>/g, '').trim()));
      });
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
    buttonText,
    handleRemoveFromCart,
  };
};
