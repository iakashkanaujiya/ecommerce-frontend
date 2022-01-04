import React, { useEffect, useState } from 'react';
import { isAuthenticated } from "../../../api/auth/authApi";
import { getAllCategories } from "../../../api/product/category";
import { loadCart } from "../../../api/product/cart";
import Link from "next/link";
import { searchProduct } from "../../../api/product/product"
const HOSTNAME = process.env.HOSTNAME;
const ImageRootPath = process.env.BACKEND_HOSTNAME;

const MobileHeader = () => {

    const [totalCartProducts, setTotalCartProducts] = useState(0);
    const [categories, setCategories] = useState([]);

    const [user, setUser] = useState({
        userDetails: {},
        authenticate: false
    });

    const { userDetails: { firstname }, authenticate } = user;

    useEffect(() => {
        // Load all categories
        getAllCategories()
            .then(data => {
                if (!data.error) setCategories(data);
            }).catch(err => console.log(err));

        // Signed in user details
        isAuthenticated() && setUser({
            ...user,
            userDetails: isAuthenticated().user,
            authenticate: true
        });
    }, []);

    useEffect(() => {
        // Total Number of products in cart
        loadCart() && setTotalCartProducts(loadCart().items.length);
    });

    const [sideBar, setSideBar] = useState(false);

    const closeSideBar = (e) => {
        const classList = e.target.classList;
        classList.forEach(cls => {
            if (cls == "side-menubar") {
                setSideBar(false);
            }
        })
    };

    const itemStyle = authenticate ? {
        color: "var(--text-color)"
    } : {
        color: "rgb(0 0 0 / 50%)"
    };

    const [search, setSearch] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = (event) => {
        if(event.target.value == "") {
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

    useEffect(() => {
        if (window !== "undefined") {
            window.addEventListener("scroll", () => {
                const el = document.querySelector(".header-main-mobile .header-top");
                if(el) {
                    if (window.pageYOffset > 20) {
                        el.style.padding = "5px 20px";
                        el.style.transition = ".3s ease-in-out";
                    } else {
                        el.style.padding = "10px 20px";
                        el.style.transition = ".3s ease-in-out";
                    }
                }
            })
        }
    });

    return (
        <div className="header-main-mobile">
            {/* header */}
            <div className="header-top">
                <div className="header-belt">
                    <div className="header-left">
                        <div onClick={() => { setSideBar(true) }} className="hamburger">
                            <span className="icon" />
                        </div>
                    </div>
                    <div className="header-middle">
                        <a href={`${HOSTNAME}/`}>
                            <img className="site-logo" src="/assets/logo/logo-mobile.png" alt="apnikiranadukaan" />
                        </a>
                    </div>
                    <div className="header-right">
                        <a href={`${HOSTNAME}/cart`} className="shopping-cart">
                            <div className="count">
                                {totalCartProducts}
                            </div>
                            <img
                                data-count={totalCartProducts}
                                className="cart-icon"
                                src="/assets/images/cart.png"
                                alt="apnikiranadukaan"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="header-belt">
                    <div className="header-left">
                        <button className="btn category">
                            <Link href={`${HOSTNAME}/categories`}>
                                Products
                            </Link>
                        </button>
                    </div>
                    <div className="header-right">
                        <div className="input-div">
                            <i className="bi bi-search" />
                            <input onChange={handleSearch} className="input" type="text" name="search" placeholder="search your product" />
                        </div>
                    </div>
                </div>
                {!!products.length && (
                    <div className="search-result-wrap">
                        <div className="search-result">
                            <ul className="result-list">
                                {products.map((product, index) => (
                                    <li key={index} className="product">
                                        <a href={`${HOSTNAME}/products/${product._id}`}>
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
            {/* navbar */}
            <div className={sideBar ? "sidebar show" : "sidebar"}>
                <div className="side-menubar" onClick={closeSideBar}>
                    <div className="navigation">
                        <nav className="navbar">
                            {authenticate ? (
                                <a href={`${HOSTNAME}/user/profile`}>
                                    <div className="user login">
                                        <div className="profile-icon-wrap">
                                            <i className="bi bi-person-fill icon" />
                                        </div>
                                        <div className="login-option">
                                            <p>Hi, {firstname ? firstname : "Welcome!"}</p>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <a href={`${HOSTNAME}/auth/signin`}>
                                    <div className="user login">
                                        <div className="profile-icon-wrap">
                                            <i className="bi bi-person-fill icon" />
                                        </div>
                                        <div className="login-option">
                                            <div>
                                                <p>Hi, Guest</p>
                                                <p style={{ fontSize: "0.7rem" }}>Sign In</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                            <div className="user-profile-options">
                                <ul className="menu-list">
                                    <li className="item">
                                        <a href={`${HOSTNAME}/`}>
                                            <i className="bi bi-house-fill icon" />
                                            <span>At Home</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/user/profile`} style={itemStyle}>
                                            <i className="bi bi-person-fill icon" />
                                            <span>My Profile</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/user/address`} style={itemStyle}>
                                            <i className="bi bi-geo-alt-fill" />
                                            <span>My Addresses</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/user/orders`} style={itemStyle}>
                                            <i className="bi bi-bag-fill" />
                                            <span>My Orders</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/cart`} style={itemStyle}>
                                            <i className="bi bi-cart-dash-fill" />
                                            <span>My Cart</span>
                                        </a>
                                    </li>
                                    {authenticate && (
                                        <li className="item">
                                            <a href={`${HOSTNAME}/auth/signout`}>
                                                <i className="bi bi-person-x-fill" />
                                                <span>Sign Out</span>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="product-categories">
                                <ul className="menu-list">
                                    <div className="title">Products</div>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/products`}>
                                            <i className="bi bi-record2" />
                                            <span>All Products</span>
                                        </a>
                                    </li>
                                    {categories.map((cate, index) => (
                                        <li key={index} className="item">
                                            <a href={`${HOSTNAME}/products/category/${cate._id}`}>
                                                <i className="bi bi-record2" />
                                                <span>{cate.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="other-options">
                                <div className="title">Others</div>
                                <ul className="menu-list">
                                    <li className="item">
                                        <a href={`${HOSTNAME}/about`}>
                                            <i className="bi bi-building" />
                                            <span>About Us</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/contact`}>
                                            <i className="bi bi-chat-right-text" />
                                            <span>Contact Us</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/refund`}>
                                            <i className="bi bi-clipboard-data" />
                                            <span>Return and Refund policy</span>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href={`${HOSTNAME}/privacy-policy`}>
                                            <i className="bi bi-journal-check" />
                                            <span>Terms & conditions</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;