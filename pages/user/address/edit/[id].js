import { Fragment, useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import { isAuthenticated } from "../../../../api/auth/authApi";
import Redirect from "../../../../Redirect";
import Menu from "../../../../components/user/Menu";
import { updateUserAddress, getAddress } from "../../../../api/user/user";

import Head from "next/head";
import { useRouter } from "next/router";

const HOSTNAME = process.env.URL;

const Address = ({ addressData }) => {

    const router = useRouter();

    // error, loading, Success
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to={`${HOSTNAME}/auth/signin`} />
        }
    }

    // Redirect User to Address page when sucessfully saved the address
    const RedirectToAddressPage = () => {
        if (redirect) {
            return <Redirect to={`${HOSTNAME}/user/address`} />
        }
    };

    // countries Data
    const [countriesData, setCountriesData] = useState({
        countries: [],
        states: []
    });

    // user authentication data
    const [userData, setUserData] = useState({
        id: "",
        token: ""
    });

    const { id, token } = userData;

    // User Shipping Address
    const [address, setAddress] = useState({
        firstname: "",
        lastname: "",
        address1: "",
        address2: "",
        city: "",
        postalCode: "",
        state: "",
        country: "",
        primaryPhone: "",
        secondaryPhone: ""
    });

    const {
        firstname,
        lastname,
        address1,
        address2,
        city,
        postalCode,
        state,
        country,
        primaryPhone,
        secondaryPhone,
    } = address;

    // preload necessary data when components builds first time
    useEffect(() => {
        const preloadData = () => {
            // Get the user info and session token from the Browser's localsotrage
            const { user, token } = isAuthenticated() && isAuthenticated();
            if (user && token) {
                setUserData({ ...userData, id: user._id, token: token });
            }
            setAddress({
                ...address,
                firstname: addressData.firstname,
                lastname: addressData.lastname,
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                postalCode: addressData.postalCode,
                state: addressData.state,
                country: addressData.country,
                primaryPhone: addressData.primaryPhone,
                secondaryPhone: addressData.secondaryPhone
            });
        };
        // call the preload function to load the data
        preloadData();
    }, []);

    // Handle the Form input fields value 
    const handleInputChange = (name) => (event) => {
        setError("");
        var value = event.target.value;
        setAddress({ ...address, [name]: value });

        if (name !== "secondaryPhone") {
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
        }
    };

    // Fire the request to backend when user submit the address form 
    const handleSubmit = (event) => {
        // prevent the default form behaviour when submit the form
        event.preventDefault();
        // check if one the address field doesn't have value
        if (!firstname || !lastname || !address1 || !address2 || !city || !postalCode || !state || !primaryPhone) {
            // set the Error message
            setError("Please submit all the required fields");
            // scroll the user on top of the page
            if (document !== "undefined") {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
        } else {
            // Set the loading true
            setLoading(true);
            // Fire the request to backend to update the user address
            updateUserAddress(address, router.query.id, id, token)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setLoading(false);
                        if (document !== "undefined") {
                            document.body.scrollTop = 0; //For Safari
                            document.documentElement.scrollTop = 0; // for chrome and others
                        }
                    } else {
                        setTimeout(() => {
                            setLoading(false);
                            setRedirect(true);
                        }, 1500);
                    }
                }).catch(err => console.log(err));
        }
    };

    return (
        <Fragment>
            <Head>
                <title>User Account</title>
            </Head>
            <Layout>
                <div className="user-profile-page my-address">
                    <div className="main-div">
                        <div className="row user-profile">
                            <div className="col-lg-3 sidebar">
                                <Menu />
                            </div>
                            <div className="col-lg-9 content-box">
                                <div className="header">
                                    <p>Add Address</p>
                                </div>
                                <div className="body">
                                    <div className="address-wrap">
                                        <form className="address-form">
                                            {!!error && (
                                                <div className="message-div">
                                                    <p>{error}</p>
                                                </div>
                                            )}
                                            <div className="fullname input-box">
                                                <div className="firstname">
                                                    <label>First Name<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("firstname")}
                                                        value={firstname}
                                                        type="text"
                                                        name="firstname"
                                                        placeholder="Jeff"
                                                    />
                                                </div>
                                                <div className="lastname">
                                                    <label>Last Name<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("lastname")}
                                                        value={lastname}
                                                        type="text"
                                                        name="lastname"
                                                        placeholder="Jonas"
                                                    />
                                                </div>
                                            </div>
                                            <div className="address">
                                                <div className="local-address input-box">
                                                    <label>Address<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("address1")}
                                                        value={address1}
                                                        name="addressLine1"
                                                        type="text"
                                                        placeholder="Flat, House no., Building, Company, Apartment"
                                                    />
                                                    <input
                                                        onChange={handleInputChange("address2")}
                                                        value={address2}
                                                        name="addressLine2"
                                                        type="text"
                                                        placeholder="Area, Colony, Street, Sector, Village"
                                                    />
                                                </div>
                                                <div className="city input-box">
                                                    <label>City <span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("city")}
                                                        value={city}
                                                        type="text"
                                                        name="city"
                                                        placeholder="city name"
                                                    />
                                                </div>
                                                <div className="area-code input-box">
                                                    <label>Area Code <span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("postalCode")}
                                                        value={postalCode}
                                                        type="code"
                                                        name="pincode"
                                                        maxLength="6"
                                                        placeholder="Area Code/Postal Code"
                                                    />
                                                </div>
                                                <div className="state input-box">
                                                    <label>State/Province <span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("state")}
                                                        value={state}
                                                        type="text"
                                                        name="state"
                                                        placeholder="state name"
                                                        style={{width: "90%"}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="phone input-box">
                                                <div className="primary">
                                                    <label>Primary Phone<span>*</span></label>
                                                    <input
                                                        onChange={handleInputChange("primaryPhone")}
                                                        value={primaryPhone}
                                                        name="phone"
                                                        type="tel"
                                                    />
                                                </div>
                                                <div className="secondary input-box">
                                                    <label>Secondary Phone</label>
                                                    <input
                                                        onChange={handleInputChange("secondaryPhone")}
                                                        value={secondaryPhone}
                                                        name="alternatePhone"
                                                        type="tel"
                                                    />
                                                </div>
                                            </div>
                                            <div className="btns">
                                                <button className="save btn" onClick={handleSubmit}>
                                                    {loading ? (
                                                        <div className="loader" style={{ "--color": "#fff" }}></div>
                                                    ) : (
                                                        <span>Update</span>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => { setRedirect(true) }}
                                                    className="btn cancel"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {RedirectToAddressPage()}
                {RedirectUserIfNotAuthenticated()}
            </Layout>
        </Fragment >
    );
};

export const getServerSideProps = async ({ params }) => {
    const { id } = params;
    const addressData = await getAddress(id);

    if (!addressData && addressData.error && !addressData.length) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            addressData
        }
    }
};

export default Address;