import { Fragment, useEffect, useState } from "react";
import { emptyCart } from "../../../../api/product/cart";
import { completeOrder } from "../../../../api/order/order";
import { isAuthenticated } from "../../../../api/auth/authApi";
import Redirect from "../../../../Redirect";

const Result = ({ id }) => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fields to update in the Order to complete the order
    const data = {
        transactionId: "00000000",
        status: "Received"
    }

    // Backend request to update the Order
    const completeTheOrder = (userId, token) => {
        setLoading(true);
        completeOrder(data, id, userId, token)
            .then(data => {
                if (data.error) {
                    setError("Order is not completed, please try again or contact us");
                    setLoading(false);
                } else {
                    setLoading(false);
                    setSuccess(true);
                }
            }).catch(err => console.log(err));
    };

    // Fire the Backedn request and update the Order page Builds
    useEffect(() => {
        const { user, token } = isAuthenticated() && isAuthenticated();
        emptyCart(() => {
            if (!!user, !!token) {
                completeTheOrder(user._id, token);
            }
        });
    }, []);

    // Countdown Timer to reidrect the user to home page
    const [seconds, setSeconds] = useState(8);
    const countDownTime = () => {
        setSeconds(seconds - 1);
    };

    useEffect(() => {
        if(!loading) {
            if (seconds > 0) {
                const timerId = setInterval(() => countDownTime(), 1000);
                return () => clearInterval(timerId);
            }
        }
    });

    const redirectUser = () => {
        if (seconds === 0) {
            return <Redirect to="/" />
        }
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div
                style={{
                    maxWidth: "350px",
                    minWidth: "300px",
                    minHeight: "400px",
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    boxShadow: "0 0 10px rgb(0 0 0 /20%)",
                    padding: "10px"
                }}
            >
                {loading ? (
                    <div>
                        <div className="spinner" style={{"--width": "50px"}}></div>
                    </div>
                ) : (
                    success ? (
                        <Fragment>
                            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
                                <img style={{ width: "100%" }} src="/assets/images/rigth.png" alt="check" />
                            </div>
                            <div style={{ padding: "20px 0" }}>
                                <h5>Thanks For Your Order!</h5>
                                <p style={{ margin: "10px 0" }} >Your order has been placed successfully</p>
                                <p style={{ margin: "10px 0" }}>You will redirect in {seconds} sec </p>
                                <a style={{ textDecoration: "underline", color: "#0061a8" }} href="/">
                                    <i className="bi bi-arrow-left"></i>
                                    <span>Go to Home Page</span>
                                </a>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
                                <img style={{ width: "100%" }} src="/assets/images/wrong.png" alt="check" />
                            </div>
                            <div style={{ padding: "20px 0" }}>
                                <h5>Your order is not placed</h5>
                                <p>{error}</p>
                                <p style={{ margin: "10px 0" }}>You will redirect in {seconds} sec </p>
                                <a style={{ textDecoration: "underline", color: "#0061a8" }} href="/"><i className="bi bi-arrow-left"></i> Go to Home Page</a>
                            </div>
                        </Fragment>
                    )
                )}
                {redirectUser()}
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ query }) => {
    // id is the ObjectId for database

    var { paymentType, id } = query;

    if (paymentType !== "cod" && !id) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            id
        }
    }
};

export default Result;
