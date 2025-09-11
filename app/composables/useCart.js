export const useCart = () => {
    const cart = useState('cart', () => []);
    const itemStatus = useState('itemStatus', () => ({}));
    const { push } = useNotivue();

    const clearStatusAfterDelay = (key, delay = 2000) => {
        setTimeout(() => {
            if (itemStatus.value[key]) {
                itemStatus.value[key] = 'idle';
            }
        }, delay);
    };

    const updateCartCache = (newCart) => {
        cart.value = newCart;
        if (process.client) {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const handleAddToCart = (productId) => {
        itemStatus.value[productId] = 'loading';

        const existingItem = cart.value.find(item => item.variation?.node.databaseId === productId);
        if (existingItem) {
            increaseQuantity(existingItem);
            return;
        }

        $fetch('/api/cart/add', {
            method: 'POST',
            body: { productId },
        })
            .then(res => {
                const newItem = res.addToCart.cartItem;
                updateCartCache([...(cart.value || []), newItem]);

                const statusKey = newItem.key;
                itemStatus.value[statusKey] = 'added';
                clearStatusAfterDelay(statusKey);

                if (statusKey !== productId) {
                    delete itemStatus.value[productId];
                }
            })
            .catch(err => {
                itemStatus.value[productId] = 'idle';
                const errorMessage = err.response?.errors?.[0]?.message?.replace(/<a[^>]*>(.*?)<\/a>/g, '').trim() || 'Could not add item.';
                push.error({ message: errorMessage });
            });
    };

    const updateItemQuantity = (item, newQuantity) => {
        const statusKey = item.key;
        itemStatus.value[statusKey] = 'loading';

        if (newQuantity <= 0) {
            handleRemoveFromCart(item.key);
            return;
        }

        $fetch('/api/cart/update', {
            method: 'POST',
            body: { items: [{ key: item.key, quantity: newQuantity }] },
        })
            .then(() => {
                const isIncreasing = newQuantity > item.quantity;
                const isDecreasing = newQuantity < item.quantity;

                const newCart = cart.value.map(cartItem =>
                    cartItem.key === item.key ? { ...cartItem, quantity: newQuantity } : cartItem
                );
                updateCartCache(newCart);

                if (isIncreasing) {
                    itemStatus.value[statusKey] = 'increased';
                } else if (isDecreasing) {
                    itemStatus.value[statusKey] = 'decreased';
                }

                clearStatusAfterDelay(statusKey);
            })
            .catch(err => {
                itemStatus.value[statusKey] = 'idle';
                const errorMessage = err.response?.errors?.[0]?.message?.replace(/<a[^>]*>(.*?)<\/a>/g, '').trim() || 'Could not update quantity.';
                push.error({ message: errorMessage });
            });
    };

    const increaseQuantity = item => updateItemQuantity(item, item.quantity + 1);
    const decreaseQuantity = item => updateItemQuantity(item, item.quantity - 1);

    const handleRemoveFromCart = key => {
        itemStatus.value[key] = 'loading';
        $fetch('/api/cart/update', {
            method: 'POST',
            body: { items: [{ key, quantity: 0 }] },
        }).then(() => {
            updateCartCache(cart.value.filter(item => item.key !== key));
            delete itemStatus.value[key];
        }).catch(() => {
            itemStatus.value[key] = 'idle';
            push.error({ message: 'Could not remove item from cart.' });
        });
    };

    onMounted(() => {
        if (process.client) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) cart.value = JSON.parse(storedCart);
        }
    });

    return {
        cart,
        itemStatus,
        handleAddToCart,
        increaseQuantity,
        decreaseQuantity,
        handleRemoveFromCart,
    };
};