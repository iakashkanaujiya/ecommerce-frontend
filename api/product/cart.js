export const addItemtoCart = (item) => {
    let cart = {
        items: [],
        totalPrice: 0,
        subTotal: 0,
        totalSavings: 0,
        shipping: 0,
        units: 0,
    };

    if (typeof window !== "undefined") {

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        // Check if Item Already exists in Cart
        var isItemExists = false;
        var itemIndex;
        cart.items.forEach((cartItem, index) => {
            if (cartItem.product._id === item.product._id && cartItem.product.weight == item.product.weight) {
                isItemExists = true;
                itemIndex = index;
            }
        });

        if (isItemExists) {
            // subtract the cart values with the item total values
            cart = {
                ...cart,
                totalPrice: cart.totalPrice - cart.items[itemIndex].totalPrice,
                subTotal: cart.subTotal - cart.items[itemIndex].subTotal,
                totalSavings: cart.totalSavings - cart.items[itemIndex].totalSavings,
                shipping: (cart.subTotal - cart.items[itemIndex].subTotal) > 500 ? 0 : 15
            }
            // replace the existing item with the updated item if already exists
            cart.items.splice(itemIndex, 1, { ...item });
        } else {
            // Push the Item in Cart's Items
            cart.items.push({ ...item });
        }

        // Calculate the Total Price and SubToal of all the Item that exists in Cart
        cart = {
            ...cart,
            totalPrice: cart.totalPrice + item.totalPrice,
            subTotal: cart.subTotal + item.subTotal,
            totalSavings: cart.totalSavings + item.totalSavings,
            shipping: (cart.subTotal + item.subTotal) > 500 ? 0 : 15,
            units: cart.items.length
        }

        // Update the Cart
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

export const updateItemToCart = (item) => {
    let cart;
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.items.map((cartItem, index) => {
            if (cartItem.product._id === item.product._id && cartItem.product.weight == item.product.weight) {

                let total_price = (cart.totalPrice - cart.items[index].totalPrice) + item.totalPrice;
                let sub_total = (cart.subTotal - cart.items[index].subTotal) + item.subTotal;

                cart = {
                    ...cart,
                    totalPrice: total_price,
                    subTotal: sub_total,
                    totalSavings: total_price - sub_total,
                    shipping: sub_total > 500 ? 0 : 15
                }

                cart.items.splice(index, 1, item);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const loadCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return false;
};

export const removeItemFromCart = (productId, weight) => {
    let cart;
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.items.map((item, index) => {
            if (item.product._id === productId && item.product.weight == weight) {
                cart = {
                    ...cart,
                    totalPrice: cart.totalPrice - item.totalPrice,
                    subTotal: cart.subTotal - item.subTotal,
                    totalSavings: cart.totalSavings - item.totalSavings,
                    shipping: (cart.subTotal - item.subTotal) > 500 ? 0 : 15,
                    units: cart.items.length - 1
                }
                cart.items.splice(index, 1);
            }
            return null;
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const emptyCart = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
    }
    next();
}


