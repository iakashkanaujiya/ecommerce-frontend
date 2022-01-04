const Checkout = ({ units, totalPrice, subTotal, shipping, totalSavings }) => {
    return (
        <div className="col-xl-4 checkout">
            <div className="checkout-box">
                <div className="header">
                    <p>PRICE DETAILS</p>
                </div>
                <div className="body">
                    <div className="price">
                        <p>Price ({units + " " + "items"})</p>
                        <p>₹{totalPrice}</p>
                    </div>
                    <div className="discount">
                        <p>Discount</p>
                        <p style={{ color: "var(--green)" }}>-₹{totalSavings}</p>
                    </div>
                    <div className="delivery-charges">
                        <p>Shipping</p>
                        <p style={{ color: "var(--green)" }}>+₹{shipping}</p>
                    </div>
                    <div className="total-amount">
                        <p>Total Amount</p>
                        <p>₹{subTotal + shipping}</p>
                    </div>
                    <div className="total-savings">
                        <p style={{ color: "var(--green", padding: "20px" }} >Your Savings: ₹{totalSavings}</p>
                    </div>
                    <div className="checkout-btn">
                        <a href="/checkout"><button>Checkout</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Checkout;