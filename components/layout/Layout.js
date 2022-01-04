import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {

    return (
        <Fragment>
            <Header />
            <div className="main-container" role="main">
                {children}
            </div>
            <Footer />
        </Fragment>
    );
};

export default Layout;