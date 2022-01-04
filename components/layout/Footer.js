const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-main">
                <div className="footer-top">
                    <div className="footer-belt">
                        <div className="footer-left">
                            <img style={{ width: "300px" }} className="site-logo" src="/assets/logo/logo.png" alt="rk products" />
                        </div>
                        <div className="footer-middle">
                            <h4 style={{ marginBottom: "10px" }}>Company Foundation</h4>
                            <p style={{lineHeight: "1.5rem"}}>
                                JustPantry is your online grocery dukann. This comapny is dedicated to server
                                the customers very well.
                                </p>
                        </div>
                        <div className="footer-right">
                            <h4 style={{ marginBottom: "10px" }}>Contact us</h4>
                            <p style={{ marginBottom: "10px" }}>Govindpuram D-Block, Ghaziabad 201013</p>
                            <p style={{ marginBottom: "10px" }}> <strong>Sell Services: +91-7007694698</strong></p>
                            <img style={{ width: "200px", height: "50px" }} src="/assets/images/paypal.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-belt">
                        <div className="footer-left">
                            <p>&copy; 2022 JustPantry</p>
                        </div>
                        <div className="footer-right">
                            <div className="social-icon-group">
                                <a className="social-icon" href="/">
                                    <i className="bi bi-house-fill"></i>
                                </a>
                                <a className="social-icon" href="#">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="bi bi-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;