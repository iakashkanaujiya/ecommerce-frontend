import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Custom404 = () => {

    const router = useRouter();

    return (
        <Fragment>
            <Head>
                <title>404 - Page not Found</title>
            </Head>
            <div id="err-page">
                <div className="home-page-button">
                    <button>
                        <a href={process.env.HOSTNAME}>Home</a>
                    </button>
                </div>
                <div className="content-box">
                    <div className="err-img">
                        <img src={`${process.env.HOSTNAME}/assets/images/background/404.png`} alt="" />
                    </div>
                    <div className="err-text">
                        <h1>404</h1>
                        <p>The requested URL <strong>{process.env.HOSTNAME + router.asPath}</strong> was not found on this webiste. Click the Home button to visit the home page.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Custom404;