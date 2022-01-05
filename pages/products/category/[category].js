import { Fragment } from "react";
import Head from "next/head";

// API methods
import { getAllProducts } from "../../../api/product/product";
import { getAllCategories, getAllSubCategories } from "../../../api/product/category";

// components
import Layout from "../../../components/layout/Layout";
import ProductsList from "../../../components/products/productsList";
import ProductsFilter from "../../../components/products/productsFilter";
import SideBar from "../../../components/products/sidebar";

const HOSTNAME = process.env.HOSTNAME;

const Products = ({ products, categories, subCategories }) => {
    return (
        <Fragment>
            <Head>
                <title>{products[0].category.name}</title>
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
                                category={products[0].category.name}
                            />
                        </div>
                        <div className="col-lg-9 col-md-12 main">
                            <ProductsList
                                products={products}
                                HOSTNAME={HOSTNAME}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};


export const getServerSideProps = async ({ query }) => {
    const filterByCategory = query.category;
    const limit = query.limit ? query.limit : 0;
    const sortBy = query.sortby ? query.sortby : "name";

    // Fetch all products
    const products = await getAllProducts(limit, sortBy, filterByCategory, "");
    // Fetch all categories
    const categories = await getAllCategories();
    // Ftech all subCategroies
    const subCategories = await getAllSubCategories();

    // Return NotFound if there was an error fetching the data
    if (!products || !categories || !subCategories) {
        return {
            notFound: true,
        }
    } else if (!products.length || !categories.length) {
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