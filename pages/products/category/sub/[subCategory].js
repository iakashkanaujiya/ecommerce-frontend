import { Fragment, useState } from "react";
import Head from "next/head";

// API methods
import { getAllProducts } from "../../../../api/product/product";
import { getAllCategories, getAllSubCategories } from "../../../../api/product/category";
import { addItemtoCart } from "../../../../api/product/cart";

// components
import Layout from "../../../../components/layout/Layout";
import ProductsList from "../../../../components/products/productsList";
import ProductsFilter from "../../../../components/products/productsFilter";
import SideBar from "../../../../components/products/sidebar";

// Hostname
const HOSTNAME = process.env.HOSTNAME;

const Products = ({ products, categories, subCategories }) => {
    // Show Confirmation Modal Box when product added sucessfully in cart
    const [productAddedModalBox, setProductAddedModalBox] = useState(false);

    // Add Item to Shopping Cart
    const addItemToShoppingCart = (item) => {
        // Item price, selling Price, and weight
        let price = item.variation[Object.keys(item.variation)[0]][0].price;
        let sellingPrice = item.variation[Object.keys(item.variation)[0]][0].sellingPrice;
        let weight = item.variation[Object.keys(item.variation)[0]][0].value;

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
                weight,
                price: parseFloat(price),
                sellingPrice: parseFloat(sellingPrice),
                image: item.images[0]
            },
            totalPrice: parseFloat(price),
            subTotal: parseFloat(sellingPrice),
            totalSavings: parseFloat(price) - parseFloat(sellingPrice),
            unit: weight,
            quantity: 1
        };
        delete item.product.images;
        // Add Item to Cart
        addItemtoCart(item);
        setProductAddedModalBox(true);
        setTimeout(() => {
            setProductAddedModalBox(false);
        }, 4000)
    };

    return (
        <Fragment>
            <Head>
                <title>{products[0].subCategory.name}</title>
            </Head>
            <Layout>
                <div className="container-fluid all-products-page">
                    <div className="row page-body">
                        <div className="col-lg-3 col-md-12 sidebar">
                            <SideBar
                                categories={categories}
                                subCategories={subCategories}
                            />
                            <ProductsFilter
                                categories={categories}
                                category={products[0].subCategory.name}
                            />
                        </div>
                        <div className="col-lg-9 col-md-12 main">
                            <ProductsList
                                products={products}
                                addItemToShoppingCart={addItemToShoppingCart}
                            />
                        </div>
                    </div>
                    <div className="modal-box">
                        <div className={productAddedModalBox ? "product-added-confirm-box show" : "product-added-confirm-box"}>
                            <div className="message">
                                <p>Product Sucessfully Added to Cart.</p>
                            </div>
                            <div className="btns">
                                <button className="btn go-to-cart">
                                    <a href={`${HOSTNAME}/cart`}>Go to Cart</a>
                                </button>
                                <button onClick={() => { setProductAddedModalBox(false) }} className="btn close">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};


export const getServerSideProps = async ({ query }) => {
    const filterBySubCategory = query.subCategory;
    const limit = query.limit ? query.limit : 0;
    const sortBy = query.sortby ? query.sortby : "name";

    // Fetch all products
    const products = await getAllProducts(limit, sortBy, "", filterBySubCategory);
    // Fetch all categories
    const categories = await getAllCategories();
    // Fetch all subCategroies
    const subCategories = await getAllSubCategories();

    // Return NotFound if there was an error fetching the data
    if (!products || !products.length || !categories || !categories.length || !subCategories || !subCategories.length) {
        return {
            notFound: true,
        }
    } else if (products.error || categories.error || subCategories.error) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            products,
            categories,
            subCategories
        }
    }
};

export default Products;