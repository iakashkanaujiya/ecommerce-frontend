import { Fragment } from "react";
import ImageSlider from "./imageSlider";

const ProductPreview = ({ data, product, onChangeProductQuantity, onSelectVariation, onAddProductToCart, isProductInCart }) => {

    const { quantity, weight, price, sellingPrice, stock } = product;

    return (
        <Fragment>
            <div className="col-xl-6 col-md-12 product-image">
                <ImageSlider images={data.images} />
            </div>
            <div className="col-xl-6 col-md-12 product-info">
                <div className="product-info-wrap">
                    <div className="product-name">
                        <h4>{data.name}</h4>
                        <p>({weight})</p>
                    </div>
                    <div className="product-price">
                        <div className="mrp">
                            <span className="tag">MRP:</span>
                            <span className="price">₹{(price * 100 / 100).toFixed(2)}</span>
                        </div>
                        <div className="selling">
                            <span className="tag">Selling Price:</span>
                            <span className="price">₹{(sellingPrice * 100 / 100).toFixed(2)}</span>
                            <div className="label discount">
                                <span>
                                    {Math.floor((price - sellingPrice) / price * 100)}% OFF
                                </span>
                            </div>
                            <p style={{ marginTop: "5px" }}>
                                Your savings: ₹{(price - sellingPrice).toFixed(2)} (Inclusive of all taxes)
                            </p>
                        </div>
                    </div>
                    <div className="product-variation">
                        <div style={{ fontSize: "1rem", fontWeight: "bold", paddingBottom: "10px" }}>
                            <span>Availability - </span>
                            <span>
                                {stock > 10 ? "In Stock" : (stock < 10 && stock > 0) ? "Only Few Left" : stock == 0 && "Currentry not available"}
                            </span>
                        </div>
                        <p className="label">Available in:</p>
                        <div className="variations">
                            {data.variation[Object.keys(data.variation)[0]].map((variation, index) => (
                                <button
                                    key={index}
                                    onClick={() => { onSelectVariation(Object.keys(data.variation)[0], index) }}
                                    className={variation.value == weight ? "btn active" : "btn"}
                                >
                                    {variation.value}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="quantity">
                        <label style={{ fontSize: "1rem" }}>Quantity:</label>
                        <div className="selector">
                            <button onClick={() => { onChangeProductQuantity("minus") }} className="btn">
                                <span>-</span>
                            </button>
                            <input type="text" className="input" value={quantity} readOnly />
                            <button onClick={() => { onChangeProductQuantity("plus") }} className="btn">
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                    <div className="add-to-cart">
                        {isProductInCart ? (
                            <button onClick={(e) => { onAddProductToCart({ ...product, ...data }, e) }} className="btn goto">
                                Go To Cart
                            </button>
                        ) : (
                            <button
                                onClick={(e) => { onAddProductToCart({ ...product, ...data }, e) }}
                                className="btn addto" disabled={stock == 0}
                            >
                                {stock == 0 ? "OUT OF STOCK" : "Add To Cart"}
                            </button>
                        )}
                    </div>
                    <div className="product-desc">
                        <div className="title">
                            <h4>Porudct Description</h4>
                        </div>
                        <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductPreview;