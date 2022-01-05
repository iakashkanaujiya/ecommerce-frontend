import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Api methods
import { isAuthenticated } from "../../api/auth/authApi";
import { loadCart } from "../../api/product/cart";
import { createOrder } from "../../api/order/order";
import { getUserAddresses } from "../../api/user/user";
import { createPaytmTransaction } from "../../api/payment/paytm";

// components
import Layout from "../../components/layout/Layout";
import Addresses from "../../components/checkout/addresses";
import OrderSummery from "../../components/checkout/orderSummery";
import PaymentOption from "../../components/checkout/paymentOptions";
import CheckoutBox from "../../components/checkout/checkout";

// Component
const Checkout = () => {

    const router = useRouter();

    // get the user information from the Cookie or loaclstograge
    const [user, setUser] = useState({
        id: "",
        token: "",
        authenticate: false
    });

    const { id, token, authenticate } = user;

    //Load all the products from the shopping cart
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState({
        items: [],
        totalPrice: 0,
        subTotal: 0,
        totalSavings: 0,
        shipping: 0,
        units: 0,
    });

    const { items, totalPrice, subTotal, totalSavings, shipping, units } = order;

    //get all the products from the Browser's local storage
    const loadProductToCart = () => {
        setOrder({
            ...order,
            ...loadCart()
        });
    };

    const [preloading, setPreloading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errorPopUp, setErrorPopUp] = useState(false);

    // Addresses state Array to store all the user's addresses
    const [addresses, setAddresses] = useState([]);
    // Delivery Address where the order will be delivered
    const [deliveryAddress, setDeliveryAddress] = useState("");

    // Load user addresses from the Backend
    const loadUserAddresses = (userId, token) => {
        setPreloading(true);
        getUserAddresses(userId, token).then(data => {
            if (data.error) {
                console.log(error);
            } else {
                setAddresses(data.reverse());
                setTimeout(() => {
                    setPreloading(false);
                }, 500);
            }
        }).catch(err => console.log(err));
    };

    // *********************** Preload all the necessary data when page builds *********************
    useEffect(() => {
        const { user, token } = isAuthenticated() && isAuthenticated();
        loadCart() && loadProductToCart();
        if (user && token) {
            setUser({ ...user, id: user._id, token: token, authenticate: true });
            loadUserAddresses(user._id, token);
            if (!loadCart()) {
                router.back();
            }
        } else {
            router.push(`/auth/signin`);
        }
    }, []);


    // Payment Type
    const [paymentType, setPaymetnType] = useState(null);
    // Select payment Type
    const onSelectPaymentType = (type) => {
        setPaymetnType(type);
    };

    // Fire the Backend request to create the order
    const createTheOrder = async (items) => {
        let filterItems = [];
        // Filter the item, and replace the Product object with the Product Id
        // This ID will be saved in database to refer the Product Schema
        items.forEach((item) => {
            filterItems.push({ ...item, product: item.product._id });
        });
        return await (
            createOrder({
                items: filterItems,
                totalPrice,
                subTotal,
                totalSavings,
                shipping,
                units,
                address: deliveryAddress,
                paymentType: paymentType,
                status: "Pending",
                placed: new Date()
            },
                id,
                token
            )
        );
    };

    // Payment
    const makePayment = async (id, orderId, userId, token) => {
        if (paymentType == "paytm") {
            /* This redirect url will go to the backend server,
            * and user will be redirected to the Frontend when payment either finish or deny  */
            var hostname = "https://ecommerce-frontend-iakashkanaujiya.vercel.app";
            var redirectUrl = encodeURIComponent(`${hostname}/checkout/payment/paytm/result?paymentType=${paymentType}&id=${id}&orderId=${orderId}`);
            // id is the ObjectID o the Database
            // OrderId is the acutal OrderID of the Order to track
            createPaytmTransaction(id, userId, token, redirectUrl).then(data => {
                if (data.error) {
                    setLoading(false);
                    setError(data.error);
                    setErrorPopUp(true);
                    setTimeout(() => {
                        setErrorPopUp(false);
                    }, 2000);
                } else {
                    setLoading(false);
                    const { body, params } = data;
                    router.push(`/checkout/payment/paytm?mid=${params.mid}&orderId=${params.orderId}&txnToken=${body.txnToken}`);
                }
            }).catch(err => console.log(err));
        } else if (paymentType == "cod") {
            setTimeout(() => {
                router.push(`/checkout/payment/cod/result?paymentType=${paymentType}&id=${id}`);
            }, 2000);
        }
    };

    // Store the OrderID to prevent the order creation again 
    // when payment doen't process due to network error or any technical error
    const [orderData, setOrderData] = useState({
        id: "",
        orderId: ""
    });

    // Palce the order
    const onPlaceOrder = async () => {
        // check whether user is ready to place the order
        if (authenticate && !!deliveryAddress && !!paymentType) {
            // Set the loading
            setLoading(true);
            /* If the payment doesn't process due to any error, we don't want to create the same order again
            * That's why, we store the OrderId to check if order is already created, 
            * and user to trying to process payemnt again */
            if (!!orderData.id) {
                makePayment(orderData.id, orderData.orderId, id, token);
            } else {
                createTheOrder(items).then(data => {
                    if (data.error) {
                        setLoading(false);
                        setError(data.error);
                        setErrorPopUp(true);
                        setTimeout(() => {
                            setErrorPopUp(false);
                        }, 2000);
                    } else {
                        setOrderData({ ...orderData, id: data._id, orderId: data.orderId });
                        makePayment(data._id, data.orderId, id, token);
                    }
                }).catch(err => console.log(err));
            }
        } else {
            setError("Please complete the required fields");
            setErrorPopUp(true);
            setTimeout(() => {
                setErrorPopUp(false);
            }, 2000);
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Checkout</title>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Head>
            <Layout>
                <div className="checkout-page">
                    <div className="row content-box" style={{ margin: "0" }}>
                        <div className="col-xl-8 col-md-12 panel-left">
                            <div className="panel-group">
                                <Addresses
                                    preloading={preloading}
                                    addresses={addresses}
                                    userId={id}
                                    token={token}
                                    loadUserAddresses={loadUserAddresses}
                                    deliveryAddress={deliveryAddress}
                                    setDeliveryAddress={setDeliveryAddress}
                                />
                                <OrderSummery items={items} />
                                <PaymentOption onSelectPaymentType={onSelectPaymentType} />
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12 panel-right">
                            <CheckoutBox
                                units={units}
                                totalPrice={totalPrice}
                                subTotal={subTotal}
                                shipping={shipping}
                                totalSavings={totalSavings}
                                onPlaceOrder={onPlaceOrder}
                            />
                        </div>
                    </div>
                    {/* error message popup */}
                    <div className={errorPopUp ? "error-message-popup show" : "error-message-popup"}>
                        <span>{error}</span>
                    </div>
                    {/* Spinner */}
                    <div id="spinner-wrap" style={{ display: loading ? "block" : "none" }}>
                        <div className="spinner" style={{ "--width": "100px" }}></div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};

export default Checkout;