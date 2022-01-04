import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

// API methods
import { emptyCart, loadCart, removeItemFromCart, updateItemToCart } from "../../api/product/cart";
import { useRouter } from "next/router";

// components
import Layout from "../../components/layout/Layout";
import Products from "../../components/cart/products";
import EmptyCart from "../../components/cart/emptyCart";
import Checkout from "../../components/cart/checkout";

const Cart = () => {

    const router = useRouter();

    // Cart State Object
    const [cart, setCart] = useState({
        items: [],
        totalPrice: 0,
        subTotal: 0,
        totalSavings: 0,
        shipping: 0,
        units: 0,
        isProducts: false
    });

    const { items, totalPrice, subTotal, totalSavings, shipping, units, isProducts } = cart;

    // Load the Cart
    const loadProductToCart = () => {
        setCart({ ...cart, ...loadCart(), isProducts: true });
    };

    useEffect(() => {
        loadCart() && loadProductToCart();
    }, []);

    /* Handle the Product Quantity Change
    * Update the Product Product in Cart */
    const onChangeProductQuantity = (name, item) => {
        if (name === "minus") {
            // Change quantity is greator than 1
            if (item.quantity > 1) {
                updateItemToCart({
                    ...item,
                    quantity: item.quantity - 1,
                    totalPrice: item.totalPrice - item.product.price,
                    subTotal: item.subTotal - item.product.sellingPrice,
                    totalSavings: (item.totalPrice - item.product.price) - (item.subTotal - item.product.sellingPrice)
                });
                loadProductToCart();
            } else {
                // Return null if quantity is 1
                return null;
            }
        } else if (name === "plus" && item.quantity < 10) {
            // Item quantity could not be more than 10
            updateItemToCart({
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + item.product.price,
                subTotal: item.subTotal + item.product.sellingPrice,
                totalSavings: (item.totalPrice + item.product.price) - (item.subTotal + item.product.sellingPrice)
            });
            loadProductToCart();
        }
    };

    // Product Id and weight to identify the Product in Cart
    const [product, setProduct] = useState({
        id: "",
        weight: ""
    });

    const { id, weight } = product;

    /* When delete the product
    * show a confirmation popup modal box */
    const [deleteConfirmModalBox, setModalBox] = useState(false);

    // Store the Product ID and weight to indetify the product in cart when click the Delete button
    const deleteProductFromCart = (productId, weight) => {
        setProduct({ ...product, id: productId, weight: weight });
        setModalBox(true);
    };

    // Delete the specific product from Cart
    const onDeleteConfirm = (value) => {
        if (value) {
            if (units > 1) {
                removeItemFromCart(id, weight);
                loadProductToCart();
                setModalBox(false);
            } else {
                // Remove the entire cart Object from the local storage
                // when there is only one product left
                emptyCart(() => {
                    setCart({
                        ...cart,
                        items: [],
                        totalPrice: 0,
                        subTotal: 0,
                        totalSavings: 0,
                        shipping: 0,
                        units: 0,
                        isProducts: false
                    });
                    setModalBox(false);
                    // reload the page to reflect the changes
                    router.reload();
                });
            }
        } else {
            setModalBox(false);
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Shopping cart</title>
            </Head>
            <Layout>
                <div className="container-fluid shopping-cart-page">
                    <div className="row card">
                        <div className={isProducts ? "col-xl-8 products" : "col-12 products"}>
                            {isProducts ? (
                                <Fragment>
                                    <div className="header">
                                        <div className="title">
                                            <p>Product</p>
                                        </div>
                                        <div className="title">
                                            <p>Retail Price</p>
                                        </div>
                                        <div className="title">
                                            <p>Quantity</p>
                                        </div>
                                        <div className="title">
                                            <p>Subtotal</p>
                                        </div>
                                    </div>
                                    <div className="body">
                                        <Products
                                            items={items}
                                            onChangeProductQuantity={onChangeProductQuantity}
                                            deleteProductFromCart={deleteProductFromCart}
                                        />
                                    </div>
                                </Fragment>
                            ) : (
                                <EmptyCart />
                            )}
                        </div>
                        {isProducts && (
                            <Checkout
                                units={units}
                                totalPrice={totalPrice}
                                totalSavings={totalSavings}
                                subTotal={subTotal}
                                shipping={shipping}
                            />
                        )}
                    </div>
                    <div className={deleteConfirmModalBox ? "modal-box show" : "modal-box"}>
                        <div className="product-delete-confirmation-box">
                            <div className="message">
                                <p>Are you sure to delete the product?</p>
                            </div>
                            <div className="btns">
                                <button onClick={() => { onDeleteConfirm(true) }} className="btn yes">Yes</button>
                                <button onClick={() => { onDeleteConfirm(false) }} className="btn no">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};

export default Cart;

