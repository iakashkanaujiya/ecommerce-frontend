const ImageRootPath = process.env.BACKEND_HOSTNAME;
const HOSTNAME = process.env.HOSTNAME;

const Products = ({ items, onChangeProductQuantity, deleteProductFromCart }) => {
    return (
        <div className="product-group">
            <ul className="product-list">
                {items.map((item, index) => (
                    <li key={index} className="product">
                        <a className="image-wrap" href={`${HOSTNAME}/products/${item.product._id}`}>
                            <div className="image">
                                <img
                                    className="image"
                                    src={`${ImageRootPath}/${item.product.image.src}`} alt={item.product.image.alt}
                                />
                                <label className="label">{(item.product.name.substring(0, 30))}... ({item.unit})</label>
                            </div>
                        </a>
                        <div className="product-info">
                            <div className="title">
                                <h6>{item.product.name.substring(0, 30)}... ({item.unit})</h6>
                            </div>
                            <div className="price">
                                <span className="label">Price: </span>
                                <span style={{ color: "rgb(255, 0, 0)" }}>
                                    ₹{item.product.sellingPrice} x {item.quantity}
                                </span>
                            </div>
                            <div className="quantity">
                                <span className="label">Quantity:</span>
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => { onChangeProductQuantity("minus", item) }}
                                        className="btn minus"
                                    >
                                        <span>-</span>
                                    </button>
                                    <input className="input" type="text" value={item.quantity} readOnly />
                                    <button
                                        onClick={() => { onChangeProductQuantity("plus", item) }}
                                        className="btn plus"
                                    >
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="subtotal">
                                <span className="label">Subtotal: </span>
                                <span style={{ display: "inline", color: "rgb(255, 0, 0)" }} >
                                    ₹{item.product.sellingPrice * item.quantity}
                                </span>
                                <button
                                    onClick={() => { deleteProductFromCart(item.product._id, item.product.weight) }}
                                    className="delete-btn"
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => { deleteProductFromCart(item.product._id, item.product.weight) }}
                            className="delete-btn"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;