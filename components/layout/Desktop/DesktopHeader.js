import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../api/auth/authApi";
import { loadCart } from "../../../api/product/cart";
import Navbar from "./Navbar";
import { searchProduct } from "../../../api/product/product";

const ImageRootPath = process.env.BACKEND_HOSTNAME;

const DesktopHeader = () => {

    const [user, setUser] = useState("");

    const [search, setSearch] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = (event) => {
        if (event.target.value == "") {
            setSearch(null);
        } else {
            setSearch(event.target.value);
        }
    };

    useEffect(() => {
        searchProduct(search).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        }).catch(err => console.log(err));
    }, [search]);

    //Count the products in cart
    const [count, setCount] = useState(0);

    const setItemCount = () => {
        loadCart() && setCount(loadCart().items.length);
    };

    useEffect(() => {
        isAuthenticated && setUser(isAuthenticated().user);
    }, []);

    useEffect(() => {
        setItemCount();
    });

    //toggle the user's profile menu
    const [userProfileMenu, setUserProfileMenu] = useState(false);
    const userProfileMenuClass = userProfileMenu ? "user-profile-menu active" : "user-profile-menu";

    return (
        <div className="header-main">
            {/* Header top */}
            <div className="header-top">
                <div className="header-belt">
                    <div className="header-left">
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
                    <div className="header-middle">
                        <form className="form" method="GET" action="/products">
                            <div className="search-box">
                                <input className="input-box" type="text" name="search" onChange={handleSearch} />
                            </div>
                        </form>
                        {!!products.length && (
                            <div className="search-result-wrap">
                                <div className="search-result">
                                    <ul className="result-list">
                                        {products.map((product, index) => (
                                            <li key={index} className="product">
                                                <a href={`/products/${product._id}`}>
                                                    <div className="image-wrap">
                                                        <img className="image" src={`${ImageRootPath}/${product.images[0].src}`} alt={product.images[0].alt} />
                                                    </div>
                                                    <div className="details">
                                                        <p className="name">{product.name}</p>
                                                        <p className="price">
                                                            <span>₹{product.variation[Object.keys(product.variation)[0]][0].sellingPrice}</span>
                                                            <span> ({product.variation[Object.keys(product.variation)[0]][0].value})</span>
                                                        </p>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="header-right">
                        <div className="menu">
                            {user ?
                                (
                                    <div
                                        className="user-profile"
                                        onMouseOver={() => { setUserProfileMenu(true) }}
                                        onMouseOut={() => { setUserProfileMenu(false) }}
                                    >
                                        <div>
                                            <i className="bi bi-person-fill"></i>
                                            <span style={{ marginLeft: "5px" }}>{"Hi, " + user.firstname}</span>
                                        </div>
                                        <div className={userProfileMenuClass}>
                                            <ul className="menu-list">
                                                <li className="menu-item">
                                                    <div>
                                                        <i className="bi bi-person-fill"></i>
                                                        <a href="/user/profile">Your Profile</a>
                                                    </div>
                                                </li>
                                                <li className="menu-item">
                                                    <div>
                                                        <i className="bi bi-cart4"></i>
                                                        <a href="/user/orders">Your Orders</a>
                                                    </div>
                                                </li>
                                                <li className="menu-item">
                                                    <div>
                                                        <i className="bi bi-geo-alt-fill"></i>
                                                        <a href="/user/address">Manage Address</a>
                                                    </div>
                                                </li>
                                                <li className="menu-item">
                                                    <div>
                                                        <i className="bi bi-person-x-fill"></i>
                                                        <a href="/auth/signout">Sign Out</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="signin">
                                        <a href="/auth/signin" className="signin-btn">
                                            <i className="bi bi-person-fill"></i>
                                            <span style={{ marginLeft: "5px" }}>Sign In</span>
                                        </a>
                                    </div>
                                )
                            }
                            <div className="cart">
                                <a href="/cart" className="shopping-cart-btn">
                                    <i className="bi bi-cart4"></i>
                                    <span style={{ marginLeft: "5px" }}>Cart
                                        <div className="items-count">
                                            <span>{count}</span>
                                        </div>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* header bottom */}
            <div className="header-bottom">
                <div className="header-belt">
                    <div className="header-left">
                        <div className="logo-box">
                            <img className="site-logo" src="/assets/logo/logo.png" alt="rk products" />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="navbar-outer">
                            <Navbar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopHeader;