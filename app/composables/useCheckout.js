export const useCheckout = () => {
  const { cart } = useCart();
  const order = useState('order', () => {});
  const userDetails = useState('userDetails', () => ({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address1: '',
  }));
  const checkoutStatus = ref('order');

  const handleCheckout = async () => {
    checkoutStatus.value = 'processing';
    const checkoutData = {
      billing: { ...userDetails.value },
      paymentMethod: 'cod',
    };

    await checkout(checkoutData).then(res => {
      cart.value = [];
      localStorage.setItem('cart', JSON.stringify(cart.value));
      order.value = res.checkout.order;
    });
  };
  return { order, userDetails, checkoutStatus, handleCheckout };
};
