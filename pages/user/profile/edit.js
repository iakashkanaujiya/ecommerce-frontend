import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

// components
import Layout from "../../../components/layout/Layout";
import Redirect from "../../../Redirect";
import Menu from "../../../components/user/Menu";

// APIs
import { isAuthenticated, updateAuthenticatedUser } from "../../../api/auth/authApi";
import { getUser, updateUser } from "../../../api/user/user";

const ProfileEdit = () => {

    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to="/auth/signin" />
        }
    }

    // loading, success, error
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [user, setUser] = useState({
        id: "",
        token: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });

    const { id, token, firstname, lastname, email, phone } = user;

    useEffect(() => {
        const preloadData = () => {
            const { user, token } = isAuthenticated() && isAuthenticated();
            if (user && token) {
                getUser(user._id, token).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setUser({
                            ...user,
                            id: data._id,
                            token: token,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: data.email,
                            phone: data.phone.substring(3, user.phone.length)
                        });
                    }
                }).catch(err => console.log(err));
            }
        };
        preloadData();
    }, []);

    // Handle the User Inputs
    const handleInputChange = (name) => (event) => {
        setError("");
        setSuccess(false);

        let value = event.target.value;
        setUser({ ...user, [name]: value });

        if (!value) {
            event.target.style.borderColor = "var(--red)";
            var el = document.createElement("span");
            el.innerHTML = "Please fill out this field";
            event.target.parentNode.insertBefore(el, event.target.nextSibling);
        } else {
            event.target.style.borderColor = "var(--primary-color)";
            var sib = event.target.nextSibling;
            if (sib) {
                sib.parentNode.removeChild(sib);
            }
        }
    };

    // Update the User Profile
    const onUpdateProfile = () => {
        setLoading(true);
        if (!firstname || !lastname || !email || !phone) {
            setLoading(false);
            setError("Please enter the required fields");
        } else {
            updateUser({ firstname, lastname, email, phone: ("+91" + phone) }, id, token).then(data => {
                if (data.error) {
                    setLoading(false);
                    setError(data.error);
                } else {
                    updateAuthenticatedUser({ firstname, lastname, email, phone: ("+91" + phone) }, () => {
                        setTimeout(() => {
                            setLoading(false);
                            setSuccess(true);
                        }, 1000);
                        setTimeout(() => {
                            setRedirect(true);
                        }, 1500);
                    });
                }
            }).catch(err => console.log(err));
        }
    }

    // Redirect to profile page
    const reidrectToProfile = () => {
        if (redirect) {
            return <Redirect to="/user/profile" />
        }
    };

    return (
        <Fragment>
            <Head>
                <title>User Account</title>
            </Head>
            <Layout>
                <div className="user-profile-page">
                    <div className="main-div">
                        <div className="row user-profile">
                            <div className="col-lg-4 sidebar">
                                <Menu />
                            </div>
                            <div className="col-lg-8 content-box">
                                <div className="header">
                                    <p>Update Your Profile</p>
                                </div>
                                <div className="body">
                                    <div className="profile-edit">
                                        {error ? (
                                            <div className="error-message">
                                                <p>{error}</p>
                                            </div>
                                        ) : success && (
                                            <div className="error-message">
                                                <p style={{ color: "var(--green)" }}>
                                                    Profile updated successfully
                                                </p>
                                            </div>
                                        )}
                                        <div className="form" role="form">
                                            <div className="input-group">
                                                <div className="input-box name">
                                                    <div className="fname">
                                                        <label htmlFor="firstname">Firstname<span>*</span></label>
                                                        <input
                                                            onChange={handleInputChange("firstname")}
                                                            type="text"
                                                            name="firstname"
                                                            value={firstname}
                                                            tabIndex="0"
                                                        />
                                                    </div>
                                                    <div className="lname">
                                                        <label htmlFor="lastname">Lastname<span>*</span></label>
                                                        <input
                                                            onChange={handleInputChange("lastname")}
                                                            type="text"
                                                            name="lastname"
                                                            value={lastname}
                                                            tabIndex="0"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="input-box email">
                                                    <label htmlFor="email">Email<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("email")}
                                                        type="email"
                                                        name="email"
                                                        value={email}
                                                        tabIndex="0"
                                                    />
                                                </div>
                                                <div className="input-box phone">
                                                    <label htmlFor="phone">Phone<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("phone")}
                                                        type="phone"
                                                        name="phone"
                                                        value={phone}
                                                        tabIndex="0"
                                                        maxLength="10"
                                                        inputMode="numeric"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn save">
                                                <button onClick={onUpdateProfile}>
                                                    {loading ? (
                                                        <div className="loader" style={{ "--color": "#fff" }}></div>
                                                    ) : (
                                                        <span>Save</span>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="btn cancel">
                                                <button onClick={() => {
                                                    setRedirect(true);
                                                }}>
                                                    Cancel
                                                </button>
                                                {reidrectToProfile()}
                                            </div>
                                        </div>
                                    </div>
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

export default ProfileEdit;