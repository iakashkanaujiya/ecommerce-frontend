const ImageRootPath = process.env.BACKEND_HOSTNAME;

const ProductList = ({ order }) => {
    return (
        <ul className="product-list">
            {order.items?.slice(0, 1).map((item, key) => (
                <li key={key} className="product-wrap">
                    <div className="product">
                        <div className="image-wrap">
                            <img
                                className="img"
                                src={`${ImageRootPath}/${item.product.images[0].src}`}
                                alt={`${item.product.images[0].alt}`} />
                        </div>
                        <div className="details">
                            <p className="name">{item.product.name.substring(0, 30)}...</p>
                            <span className="unit">({item.unit})</span>
                            <span className="quantity">Quantity: {item.quantity}</span>
                            <span className="subtotal" style={{color: "var(--red)"}}>₹{item.subTotal}</span>
                        </div>
                    </div>
                    {order.units > 1 && (
                        <div style={{textAlign: "center"}}>
                            <p style={{ fontWeight: "bold" }}>{order.units} item(s)</p>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ProductList;