import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Redirect from "../../../Redirect";

// API methods
import { isAuthenticated } from "../../../api/auth/authApi";
import { getUserOrders } from "../../../api/user/user";
import { updateOrderStatus } from "../../../api/order/order";

// components
import Layout from "../../../components/layout/Layout";
import Menu from "../../../components/user/Menu";
import Order from "../../../components/user/order/order";

const User = () => {

    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to="/auth/signin" />
        }
    }

    // loading, success, error
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // user
    const [user, setUser] = useState({
        userId: "",
        token: ""
    });

    const { userId, token } = user;

    // Orders
    const [orders, setOrders] = useState([""]);
    const [orderId, setOrderId] = useState(null);
    const [orderCancellationPopUp, setOrderCancellationPopUp] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { user, token } = isAuthenticated() && isAuthenticated();
        if (user && token) {
            setUser({ ...user, userId: user._id, token: token });
            getOrders(user._id, token);
        }
    }, []);

    const getOrders = (userId, token) => {
        getUserOrders(userId, token)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setOrders(data);
                    setSuccess(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            }).catch(err => console.log(err));
    };

    const onCancelOrder = (id) => {
        setOrderId(id);
        setOrderCancellationPopUp(true);
    };

    const onConfirmOrderCancellation = () => {
        setOrderCancellationPopUp(false);
        setLoading(true);
        updateOrderStatus(orderId, "Cancelled", userId, token)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                } else {
                    setLoading(false);
                    getOrders(userId, token);
                }
            }).catch(err => console.log(err));
    };

    return (
        <Fragment>
            <Head>
                <title>User Account</title>
            </Head>
            <Layout>
                {loading ? (
                    <div style={{ position: "relative", width: "100%", height: "500px", padding: "40px" }}>
                        <div className="spinner" style={{ "--width": "50px" }}></div>
                    </div>
                ) : (
                    <div className="user-profile-page my-orders">
                        <div className="main-div">
                            <div className="row user-profile">
                                <div className="col-lg-3 sidebar">
                                    <Menu />
                                </div>
                                <div className="col-lg-9 content-box">
                                    <div className="header">
                                        <p>Your Orders</p>
                                    </div>
                                    <div className="body">
                                        {!!orders.length ? (
                                            <Order orders={orders} />
                                        ) : (
                                            <div style={{ padding: "50px 0", textAlign: "center", background: "var(--secondary-color)" }}>
                                                <img style={{ width: "100px" }} src="/assets/images/shopping-bag.png" alt="cart" />
                                                <h4 style={{ margin: "10px 0" }} >You have no orders</h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal Pop Box for Order cancellation confirmation */}
                        <div id="confirm" className={orderCancellationPopUp ? "modal-box-wrap show" : "modal-box-wrap"}>
                            <div className="modal-box">
                                <p className="title">Are you sure to cancel the order?</p>
                                <div className="btns">
                                    <button onClick={onConfirmOrderCancellation} className="btn yes">Yes</button>
                                    <button onClick={() => { setOrderCancellationPopUp(false) }} className="btn no">No</button>
                                </div>
                            </div>
                        </div>
                        {/* Modal Box form any success and Error message */}
                        <div id="message" className={error ? "modal-box-wrap show" : "modal-box-wrap"}>
                            <div className="modal-box">
                                <p style={{ margin: "0px" }}>{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                {RedirectUserIfNotAuthenticated()}
            </Layout>
        </Fragment >
    );
};

export default User;