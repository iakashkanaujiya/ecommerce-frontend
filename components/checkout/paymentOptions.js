const PaymentOptions = ({ onSelectPaymentType }) => {
    return(
        <div className="payment-panel">
            <div className="header">
                <span>3</span>
                <span style={{ fontSize: "1rem" }}>Payment Options</span>
            </div>
            <div className="payment-options">
                <div>
                    <input onChange={() => { onSelectPaymentType("paytm") }} type="radio" name="payment" />
                    <span><img width="50" src="assets/images/paytm-logo.png" alt="paytm" /></span>
                    <span style={{ margin: "0 10px" }}></span>
                    <span><img width="50" src="assets/images/upi-logo.png" alt="paytm" /></span>
                </div>
                <div>
                    <input onChange={() => { onSelectPaymentType("paytm") }} type="radio" name="payment" />
                    <span>Debit Card / Credit Card</span>
                </div>
                <div>
                    <input onChange={() => { onSelectPaymentType("cod") }} type="radio" name="payment" />
                    <span>Cash on Delivery</span>
                </div>
            </div>
        </div>
    )
};

export default PaymentOptions;