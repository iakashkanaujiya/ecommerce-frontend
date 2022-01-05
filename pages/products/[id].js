import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// API methods
import { addItemtoCart, loadCart } from "../../api/product/cart";
import { getAllProducts } from "../../api/product/product";
import { API } from "../../api/apiEndpoint";

// components
import Layout from "../../components/layout/Layout";
import ProductPreview from "../../components/products/product/product";
import RelatedProducts from "../../components/products/product/relatedProducts";

const Product = ({ data, relatedProducts }) => {

    const router = useRouter();

    // Product object
    const [product, setProduct] = useState({
        quantity: 1,
        weight: "",
        price: 0,
        sellingPrice: 0,
        stock: 0
    });

    const { quantity, weight, price, sellingPrice } = product;

    // check if the product already in Cart
    // if product already exists in cart, we will show the go to cart Button
    // instead of add to cart button
    const [isProductInCart, setIsProductInCart] = useState(false);

    // return true or false based on the condition match
    // this function takes the product weigth and match
    // aganist the item weight
    const checkProductInCart = (weight) => {
        // store the boolean value
        var result = !!loadCart()?.items?.filter(item => {
            return (item.product._id === data._id && item.product.weight === weight)
        }).length;
        // set the boolean value of the result
        setIsProductInCart(result);
    };

    // get the product quantity from the cart
    // if product already in cart
    const getProductQuantity = (weight) => {
        let productQuantity;
        loadCart()?.items?.forEach(item => {
            if (item.product._id === data._id && item.product.weight === weight) {
                productQuantity = item.quantity;
            }
        });
        return productQuantity;
    };

    // Load the Product Details
    useEffect(() => {
        let key = Object.keys(data.variation)[0];
        let ob = data.variation[key][0];

        setProduct({
            ...product,
            price: parseFloat(ob.price),
            sellingPrice: parseFloat(ob.sellingPrice),
            stock: parseInt(ob.stock),
            weight: ob.value,
            quantity: !!getProductQuantity(ob.value) ? getProductQuantity(ob.value) : 1
        });
        // check if the product exists in cart
        checkProductInCart(ob.value);
    }, []);

    // Handle Product Quantity Change
    const onChangeProductQuantity = (name) => {
        if (name === "minus") {
            if (quantity == 1) {
                setProduct({ ...product, quantity: 1 });
            } else {
                setProduct({
                    ...product,
                    quantity: quantity - 1
                });
            }
        } else if (name === "plus" && quantity < 10) {
            setProduct({
                ...product,
                quantity: quantity + 1
            });
        }
    };

    // On select the Product weight variation, chnage the product price, subTotal, etc.
    const onSelectVariation = (key, index) => {
        let ob = data.variation[key][index];
        setProduct({
            ...product,
            price: parseFloat(ob.price),
            sellingPrice: parseFloat(ob.sellingPrice),
            stock: parseInt(ob.stock),
            weight: ob.value,
            quantity: !!getProductQuantity(ob.value) ? getProductQuantity(ob.value) : 1
        });
        //check if the product exists in cart
        checkProductInCart(ob.value);
    };

    // Add the Product to Cart
    const onAddProductToCart = (item, event) => {
        const el = event.target;
        // animate the button when click to add to Cart
        // then remove the animation after 1s
        if (!isProductInCart) {
            el.style.animation = "shakeXY 500ms ease-in-out";
            setTimeout(() => {
                el.style.animation = "none";
            }, 1000);
        }

        delete item.variation;
        delete item.description;
        delete item.createdAt;
        delete item.updatedAt;
        delete item.stock;
        delete item.category;
        delete item.subCategory;
        // Item Object
        item = {
            product: {
                ...item,
                image: item.images[0],
                price,
                sellingPrice,
            },
            totalPrice: price * quantity,
            subTotal: sellingPrice * quantity,
            totalSavings: price * quantity - sellingPrice * quantity,
            unit: weight,
            quantity,
            shipping: 15,
        }
        delete item.product.images;
        delete item.product.quantity;
        delete item.product.__v;

        addItemtoCart(item);
        checkProductInCart(weight);

        if (isProductInCart) {
            router.push("/cart");
        }
    };

    return (
        <Fragment>
            <Head>
                <title>{data.name}</title>
            </Head>
            <Layout>
                <div className="container-fluid product-page">
                    <div className="page-body">
                        <div className="row product">
                            <ProductPreview
                                data={data}
                                product={product}
                                onChangeProductQuantity={onChangeProductQuantity}
                                onSelectVariation={onSelectVariation}
                                onAddProductToCart={onAddProductToCart}
                                isProductInCart={isProductInCart}
                            />
                        </div>
                        <RelatedProducts
                            products={relatedProducts}
                        />
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    // Fetch the Product by ID
    const res = await fetch(`${API}/product/${context.params.id}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    // Product data
    const data = await res.json();
    // Product Category
    const category = data.category._id;
    // Fetch all the products related to product category
    const products = await getAllProducts(0, "name", category, "");

    // Generate the random number
    var randomNumber = Math.floor(Math.random() * (products.length - 20));

    // Filter the random products
    const filterProducts = (product, index) => {
        return index > randomNumber && index <= randomNumber + 20;
    }

    // Random related products
    var relatedProducts = products.filter(filterProducts);

    if (!data || data.error || !relatedProducts || relatedProducts.error) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data,
            relatedProducts
        }
    }

}

export const getStaticPaths = async () => {
    const products = await getAllProducts(0, "name", "", "");
    const ids = products.map(product => product._id);
    const paths = ids.map(id => ({ params: { id: id } }));
    return {
        paths,
        fallback: false
    }
};

export default Product;