import ProductList from "./productList";

const Order = ({ orders }) => {
    return (
        <div className="orders">
            <div className="orders-group">
                <ul className="orders-list">
                    {orders?.map((order, index) => (
                        <li key={index} className="order">
                            <a href={`/user/orders/${order._id}`}>
                                <div className="order-details">
                                    <span className="order-id">Order Id: {order.orderId}</span>
                                    <div>
                                        <span
                                            style={{ color: order.status == "Cancelled" ? "var(--red)" : "var(--green)" }}
                                            className="status"
                                        >
                                            {order.status}
                                        </span>
                                        <i class="bi bi-chevron-right"></i>
                                    </div>
                                </div>
                                <ProductList order={order} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Order;