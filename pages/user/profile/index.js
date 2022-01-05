import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../../components/layout/Layout";
import { isAuthenticated } from "../../../api/auth/authApi";
import Redirect from "../../../Redirect";

const User = () => {

    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to="/auth/signin" />
        }
    }

    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });

    const { id, firstname, lastname, email, phone } = user;

    useEffect(() => {
        const preloadData = () => {
            const { user, token } = isAuthenticated() && isAuthenticated();
            if (!!user && !!token) {
                setUser({
                    ...user,
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone
                });
            }
        };
        preloadData();
    }, []);

    const UserMenu = () => {
        return (
            <div className="user-menu">
                <ul className="menu-list">
                    <li className="item">
                        <a href="/">
                            <i className="bi bi-house-fill icon" />
                            <span>At Home</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="/user/address">
                            <i className="bi bi-geo-alt-fill" />
                            <span>My Addresses</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="/user/orders">
                            <i className="bi bi-bag-fill" />
                            <span>My Orders</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="/cart">
                            <i className="bi bi-cart-dash-fill" />
                            <span>My Cart</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="/about">
                            <i className="bi bi-building" />
                            <span>About Us</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="/contact">
                            <i className="bi bi-chat-right-text" />
                            <span>Contact Us</span>
                        </a>
                    </li>
                    <li className="item signout-btn">
                        <a href="/auth/signout">
                            <i className="bi bi-person-x-fill" />
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>User Account</title>
            </Head>
            <Layout>
                <div className="user-profile-page">
                    <div className="main-div">
                        <div className="user-profile">
                            <div className="col-12 content-box">
                                <div className="profile-wrap">
                                    <div className="profile">
                                        <div className="user-image">
                                            <img className="image" src="/assets/images/avatar.png" alt="user" />
                                        </div>
                                        <div className="user-info">
                                            <div>
                                                {!firstname && !email && (<p>Hi, Welcome Guest!</p>)}
                                                {firstname && email && (
                                                    <div>
                                                        <p>{firstname + " " + lastname}</p>
                                                        <p>{email}</p>
                                                    </div>
                                                )}
                                                <p>{phone}</p>
                                            </div>
                                            <div className="profile-edit-btn">
                                                <a href={`/user/profile/edit?id=${id}`}>
                                                    <span>Edit</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <UserMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {RedirectUserIfNotAuthenticated()}
            </Layout>
        </Fragment >
    );
};

export default User;