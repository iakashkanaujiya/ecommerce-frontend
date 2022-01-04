const EmptyCart = () => {
    return (
        <div className="cart-empty">
            <div className="content-box">
                <h2>Your Shopping Cart Is Empty</h2>
                <div className="image">
                    <img src="/assets/images/shopping-bag.png" alt="cart" />
                </div>
                <div className="content">
                    <p>If you already have an account, <span><a style={{ color: "var(--primary-color)", textDecoration: "underline" }} href="/auth/signin">Sign In</a></span> to access any items you may have previously added to your cart.</p>
                    <p>Take a look at our products or browse our products that support a Healthy & Fit lifestyle.</p>
                </div>
            </div>
            <a href="/" className="shopping-btn">
                <button>Continue Shopping</button>
            </a>
        </div>
    )
};

export default EmptyCart;