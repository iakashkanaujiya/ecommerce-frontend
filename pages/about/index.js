import Head from "next/head";
import { Fragment } from "react";

// Components
import Layout from "../../components/layout/Layout"

// Functional Component
const About = () => {
    return (
        <Fragment>
            <Head>
                <title>About company</title>
            </Head>
            <Layout>
                <div className="about-page" style={{ padding: "20px" }}>
                    <h1 className="title" style={{ paddingBottom: "20px" }}>We're ready to serve you better!</h1>
                    <p className="text" style={{ padding: "20px 0", lineHeight: "30px", fontSize: "16px" }}>
                        Welcome to JustPantry, an online Grocery Dukkan. We're dedicated
                        to giving you the very best of [product], with a focus on
                        providing the best quality and fastest delivery at your home.
                        Founded in 2021 by "Akash Kanaujiya," JustPantry has come a long
                        way from its beginnings in Ghaziabad. When "Akash Kanaujiya"
                        first started out, his passion for business drove him into
                        action to build JustPantry so that it can offer you a
                        variety of products for your home and family. We now serve
                        customers all over India and are thrilled that we're able to turn
                        our passion into our own website.
                    </p>
                    <hr />
                    <p className="text" style={{ padding: "20px 0", lineHeight: "30px", fontSize: "16px" }}>
                        We hope you enjoy our products as much as we enjoy offering
                        them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                    <p className="text" style={{ lineHeight: "30px", fontSize: "16px" }}>
                        Sincerely,
                        <span>Akah Kanaujiya</span>
                    </p>
                </div>
            </Layout>
        </Fragment>
    );
};

export default About;