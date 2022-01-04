const ImageRootPath = process.env.BACKEND_HOSTNAME;
const HOSTNAME = process.env.HOSTNAME;

const RelatedProducts = ({ products }) => {
    return (
        <div className="row related-products">
            <div className="title">
                <h5 style={{ margin: "0" }}>More Products Like</h5>
            </div>
            {products.map((product, index) => {
                return (
                    <div key={index} className="col-xl-3 col-md-4 col-6 product">
                        <div className="product-box">
                            <div className="product-image-div">
                                <label className="dicount-label">
                                    {(Math.floor(
                                        ((parseFloat(product.variation[Object.keys(product.variation)[0]][0].price) -
                                            parseFloat(product.variation[Object.keys(product.variation)[0]][0].sellingPrice)) /
                                            parseFloat(product.variation[Object.keys(product.variation)[0]][0].price)) * 100
                                    )) + "% OFF"}
                                </label>
                                <a href={`${HOSTNAME}/products/${product._id}`}>
                                    <img
                                        className="product-image"
                                        src={ImageRootPath + "/" + product.images[0].src}
                                        alt={product.images[0].alt}
                                    />
                                </a>
                            </div>
                            <div className="product-info-div">
                                <div className="product-name">
                                    <p>{(product.name.substring(0, 40))}...</p>
                                </div>
                                <div className="product-price">
                                    <span>{"₹" + product.variation[Object.keys(product.variation)[0]][0].sellingPrice}</span>
                                    <span style={{ marginLeft: "5px" }}>({product.variation[Object.keys(product.variation)[0]][0].value})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RelatedProducts;