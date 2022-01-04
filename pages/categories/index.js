import { Fragment } from "react";
import Head from "next/head";

// API methods
import { getAllCategories, getAllSubCategories } from "../../api/product/category";

// components
import Layout from "../../components/layout/Layout";

// Image Root Path and Hostname
const ImageRootPath = process.env.BACKEND_HOSTNAME;
const HOSTNAME = process.env.URL;

const Categories = ({ categories, subCategories }) => {
    return (
        <Fragment>
            <Head>
                <title>Product Categories</title>
            </Head>
            <Layout>
                <div className="container-fluid category-page col-lg-6">
                    <div className="categories-wrap">
                        <ul className="categories-list row">
                            {categories.map((category, index) => (
                                <li className="category col-12" key={index}>
                                    <div className="image-wrap">
                                        <a href={`${HOSTNAME}/products/category/${category._id}`}>
                                            <img
                                                className="image"
                                                src={`${ImageRootPath}/${category.image.src}`}
                                                alt={category.image.alt}
                                            />
                                        </a>
                                    </div>
                                    <div className="dropdown-option">
                                        <button className="dropdown-btn">
                                            <i className="bi bi-chevron-down"></i>
                                        </button>
                                        <input className="checkbox" type="checkbox" />
                                        <ul className="sub-category-list row">
                                            {subCategories.map((subCate, index) => {
                                                if (subCate.category._id === category._id) {
                                                    return (
                                                        <li key={index} className="sub-category col-4">
                                                            <div className="image-wrap">
                                                                <a href={`${HOSTNAME}/products/category/sub/${subCate._id}`}>
                                                                    <img
                                                                        className="image"
                                                                        src={`${ImageRootPath}/${subCate.image.src}`}
                                                                        alt={subCate.image.alt}
                                                                    />
                                                                </a>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </Fragment>
    );
};

export const getServerSideProps = async () => {
    // Fetch all categories
    const categories = await getAllCategories();
    // Fetch all subCategories
    const subCategories = await getAllSubCategories();

    if (!categories || !subCategories || categories.error || subCategories.error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            categories,
            subCategories
        }
    }

};

export default Categories;