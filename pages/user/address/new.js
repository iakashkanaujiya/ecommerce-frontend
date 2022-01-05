import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../../components/layout/Layout";
import { isAuthenticated } from "../../../api/auth/authApi";
import Redirect from "../../../Redirect";
import Menu from "../../../components/user/Menu";
import AddressForm from "../../../components/user/address/form";
import { addUserAddress } from "../../../api/user/user";

const Address = () => {

    // error, loading, Success
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to={`/auth/signin`} />
        }
    }

    // Redirect User to Address page when sucessfully saved the address
    const RedirectToAddressPage = () => {
        if (redirect) {
            return <Redirect to={`/user/address`} />
        }
    };

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
        country: "India",
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
        };
        // call the preload function to load the data
        preloadData();
    }, []);

    // Handle the Form input fields value 
    const handleInputChange = (name) => (event) => {
        setError("");
        setSuccess(false);
        setAddress({ ...address, [name]: event.target.value });
        if (name === "country") {
            loadStatesByCountry(event.target.value);
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
            addUserAddress({ ...address, "user": id }, id, token)
                .then(data => {
                    if (data.error) {
                        if (document !== "undefined") {
                            document.body.scrollTop = 0; // For Safari
                            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        }
                        setLoading(false);
                        setError(data.error);
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
                                    <p>Add Your Address</p>
                                </div>
                                <div className="body">
                                    <AddressForm 
                                        error={error}
                                        loading={loading}
                                        success={success}
                                        firstname={firstname}
                                        lastname={lastname}
                                        address1={address1}
                                        address2={address2}
                                        city={city}
                                        postalCode={postalCode}
                                        state={state}
                                        country={country}
                                        primaryPhone={primaryPhone}
                                        secondaryPhone={secondaryPhone}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        setRedirect={setRedirect}
                                    />
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

export default Address;