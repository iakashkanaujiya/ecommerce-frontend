const ImageRootPath = process.env.BACKEND_HOSTNAME;

const OrderSummery = ({ items }) => {
    return (
        <div className="order-summery">
            <div className="header">
                <span>2</span>
                <span style={{ fontSize: "1rem" }}>Order Summery</span>
            </div>
            <div className="orders">
                <ol className="order-list">
                    {items.map((item, index) => (
                        <li key={index} className="order">
                            <div className="image-wrap">
                                <img style={{ width: "50px" }} src={`${ImageRootPath}/${item.product.image.src}`} />
                            </div>
                            <div className="details">
                                <p className="name">{item.product.name.substring(0, 40)}...</p>
                                <p className="weight">({item.product.weight})</p>
                                <p style={{ color: "var(--red)" }} className="price">₹{item.product.sellingPrice} x {item.quantity} = ₹{item.subTotal}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
};

export default OrderSummery;