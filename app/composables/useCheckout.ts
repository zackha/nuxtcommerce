const defaultUserDetails = (): CheckoutUserDetails => ({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  address1: '',
});

export const useCheckout = () => {
  const { cart } = useCart();
  const order = useState<CheckoutOrder | null>('order', () => null);
  const userDetails = useState<CheckoutUserDetails>('userDetails', defaultUserDetails);
  const checkoutStatus = ref<CheckoutStatus>('order');

  const clearCart = () => {
    cart.value = [];
    if (!process.client) return;
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  const handleCheckout = async () => {
    if (checkoutStatus.value !== 'order') return;
    checkoutStatus.value = 'processing';

    try {
      const response = await $fetch<CheckoutResponse>('/api/checkout', {
        method: 'POST',
        body: {
          billing: { ...userDetails.value },
          paymentMethod: 'cod',
        },
      });

      clearCart();
      order.value = response.checkout?.order ?? null;
    } finally {
      checkoutStatus.value = 'order';
    }
  };

  return {
    order,
    userDetails,
    checkoutStatus,
    handleCheckout,
  };
};
