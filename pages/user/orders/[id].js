import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

// API methods
import { isAuthenticated } from "../../../api/auth/authApi";
import { getOrder } from "../../../api/order/order";

// components
import Layout from "../../../components/layout/Layout";
import Menu from "../../../components/user/Menu";

const ImageRootPath = process.env.BACKEND_HOSTNAME;

const Order = ({ id }) => {

    // loading, success, error
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // user
    const [user, setUser] = useState({
        userId: "",
        token: ""
    });

    const { userId, token } = user;

    const [order, setOrder] = useState({});
    const {
        items,
        address,
        orderId,
        status,
        paymentType,
        totalPrice,
        subTotal,
        totalSavings,
        shipping,
        transactionId,
        placed,
        units
    } = order;

    const [orderCancellationPopUp, setOrderCancellationPopUp] = useState(false);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getTheOrder = () => {
        getOrder(id).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                const d = new Date(data.placed);
                const pd = months[d.getMonth()] + " " + d.getDate().toString() + ", " + d.getFullYear().toString();
                console.log(data);
                setOrder({ ...data, placed: pd });
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        setLoading(true);
        const { user, token } = isAuthenticated() && isAuthenticated();
        if (user && token) {
            setUser({ ...user, userId: user._id, token: token });
            getTheOrder();
        }
    }, []);

    // const onCancelOrder = (id) => {
    //     setOrderId(id);
    //     setOrderCancellationPopUp(true);
    // };

    // const onConfirmOrderCancellation = () => {
    //     setOrderCancellationPopUp(false);
    //     setLoading(true);
    //     updateOrderStatus(orderId, "Cancelled", userId, token)
    //         .then(data => {
    //             if (data.error) {
    //                 setError(data.error);
    //                 setLoading(false);
    //             } else {
    //                 setLoading(false);
    //                 getOrders(userId, token);
    //             }
    //         }).catch(err => console.log(err));
    // };

    const renderItems = (items) => {
        return (
            items?.map((item, index) => (
                <li key={index} className="item-wrap">
                    <div className="item">
                        <div className="img-wrap">
                            <img src={`${ImageRootPath}/${item.product.images[0].src}`} alt="" />
                        </div>
                        <div className="details-wrap">
                            <div className="name">{item.product.name.substring(0, 25)}...</div>
                            <div className="quantity">Quantity: {item.quantity}</div>
                            <div className="subtotal">₹{item.subTotal}</div>
                        </div>
                    </div>
                </li>
            ))
        )
    }

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
                    <div className="user-profile-page my-orders ordered">
                        <div className="main-div">
                            <div className="row user-profile">
                                <div className="col-lg-3 sidebar">
                                    <Menu />
                                </div>
                                <div className="col-lg-9 content-box">
                                    <div className="header">
                                        <p>Order: {order.orderId}</p>
                                            <p style={{fontSize: "14px", marginTop: "20px"}}>
                                                <a target="none" style={{ color: "red" }} href={order.invoice}>
                                                Download Invoice
                                            </a>
                                        </p>
                                    </div>
                                    <div className="body">
                                        {!!Object.keys(order).length && (
                                            <div className="wrapper">
                                                <div className="ordered-wrap">
                                                    <div className="ordered-items">
                                                        <ul className="items-list">
                                                            {renderItems(items)}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="order-status-wrap">
                                                    <div className="order-status">
                                                        <div className="received">
                                                            <div className="status">
                                                                <div className="text">Received</div>
                                                                <div className="date">{order.placed}</div>
                                                            </div>
                                                            <div
                                                                style={{ backgroundColor: order.status == "Received" && "var(--green)" }}
                                                                className="intigator-dot">
                                                            </div>
                                                            <div
                                                                style={{ backgroundColor: order.status == "Shipped" && "var(--green)" }}
                                                                className="bar">
                                                            </div>
                                                        </div>
                                                        <div className="shipped">
                                                            <div className="status">
                                                                <div className="text">Shipped</div>
                                                                <div className="date">Soon</div>
                                                            </div>
                                                            <div
                                                                style={{ backgroundColor: order.status == "Shipped" && "var(--green)" }}
                                                                className="intigator-dot">
                                                            </div>
                                                            <div
                                                                style={{ backgroundColor: order.status == "Delivered" && "var(--green)" }}
                                                                className="bar">
                                                            </div>
                                                        </div>
                                                        <div className="delivered">
                                                            <div className="status">
                                                                <div className="text">Delivered</div>
                                                                <div className="date">Soon</div>
                                                            </div>
                                                            <div
                                                                style={{ backgroundColor: order.status == "Delivered" && "var(--green)" }}
                                                                className="intigator-dot">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="delivery-address">
                                                    <div className="title">Delivery Address</div>
                                                    <div className="address">
                                                        <div className="c-name">{address.firstname} {address.lastname}</div>
                                                        <div>{address.address1 + " " + address.address2}</div>
                                                        <div>{address.city} - {address.postalCode}, {address.state}</div>
                                                    </div>
                                                    <div className="contact-numbers">
                                                        <div className="title">Phone number</div>
                                                        <div className="numbers">
                                                            {address.primaryPhone} {address.secondaryPhone && ", " + address.secondaryPhone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </Fragment >
    );
};


export const getServerSideProps = async ({ query }) => {
    const id = query.id;

    return {
        props: {
            id
        }
    }
};

export default Order;