const CheckoutBox = ({ units, totalPrice, totalSavings, subTotal, shipping, onPlaceOrder }) => {
    return (
        <div className="checkout-box">
            <div className="header">
                <span>4</span>
                <span style={{ fontSize: "1rem" }}>Price Details</span>
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
                    <p>+₹{shipping}</p>
                </div>
                <div className="total-amount">
                    <p>Total Amount</p>
                    <p>₹{subTotal + shipping}</p>
                </div>
                <div style={{ padding: "20px", color: "var(--green)" }}>
                    <p>Your Savings ₹{totalSavings}</p>
                </div>
                <div className="checkout-btn">
                    <button onClick={onPlaceOrder}>Place Your Order</button>
                </div>
            </div>
        </div>
    )
};

export default CheckoutBox;