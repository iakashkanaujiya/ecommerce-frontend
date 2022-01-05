import { Fragment } from "react";
import Head from "next/head";

const Custom404 = () => {

    return (
        <Fragment>
            <Head>
                <title>404 - Page not Found</title>
            </Head>
            <div id="err-page">
                <div className="home-page-button">
                    <button>
                        <a href="/">Home</a>
                    </button>
                </div>
                <div className="content-box">
                    <div className="err-img">
                        <img src={`/assets/images/background/404.png`} alt="" />
                    </div>
                    <div className="err-text">
                        <h1>404</h1>
                        <p>The requested URL was not found on this webiste. Click the Home button to visit the home page.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Custom404;