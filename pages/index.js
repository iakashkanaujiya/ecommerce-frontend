import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import Slider from "../components/home/Slider";
import { getAllCategories, getAllSubCategories } from "../api/product/category";

const HOSTNAME = process.env.URL;
const ImageRootPath = process.env.BACKEND_HOSTNAME;

const Home = ({ categories, subCategories }) => {

  return (
    <Fragment>
      <Head>
        <title>Just Pantry</title>
        <meta name="description" content="JustPantry" />
        <meta name="keywords" content="justpantry" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Layout>
        <div id="home-page">
          <Slider />
          <div className="product-catelog container-fluid">
            {
              categories?.map((category, index) => (
                <div className="product-category" key={index}>
                  <div className="title">
                    <div>{category.name}</div>
                  </div>
                  <div className="sub-category-list row">
                    {
                      subCategories?.map((subCate, index) => {
                        if (subCate.category.name == category.name) {
                          return (
                            <div className="sub-category-view col-xl-3 col-md-4 col-sm-6 col-6" key={index}>
                              <a href={`${HOSTNAME}/products/category/sub/${subCate._id}`}>
                                <div className="image-wrap">
                                  <img src={`${ImageRootPath}/${subCate.image.src}`} alt={subCate.name} className="image" />
                                </div>
                              </a>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

// Fetch the data
export const getServerSideProps = async () => {

  const categories = await getAllCategories();
  const subCategories = await getAllSubCategories();

  if (!categories || !subCategories) {
    return {
      notFound: true
    }
  }

  if (categories.error || subCategories.error) {
    return {
      notFound: true
    }
  }

  return {
    props: { categories, subCategories }
  }

};

export default Home;

