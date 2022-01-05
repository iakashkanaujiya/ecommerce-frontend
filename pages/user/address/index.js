import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

// API methods
import { isAuthenticated } from "../../../api/auth/authApi";
import { getUserAddresses, deleteUserAddress } from "../../../api/user/user";

// components
import Layout from "../../../components/layout/Layout";
import Redirect from "../../../Redirect";
import Menu from "../../../components/user/Menu";
import Addresses from "../../../components/user/address/addresses";
import DeleteConfirmModal from "../../../components/modalPopup/deleteConfirmModal";

// Hostname
const HOSTNAME = process.env.HOSTNAME;

const Address = () => {
    // Redirect user to Sign In page if not signed In
    const RedirectUserIfNotAuthenticated = () => {
        if (!isAuthenticated()) {
            return <Redirect to={`/auth/signin`} />
        }
    }

    // Neccessary States Variables
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleteConfirmationBox, setDeleteConfirmationBox] = useState(false);
    const [addressId, setAddressId] = useState("");
    const [allAddresses, setAllAddresses] = useState([""]);

    // userId, and authToken
    const [user, setUser] = useState({
        id: "",
        token: ""
    });

    const { id, token } = user;

    // Load the user address
    const loadUserAddress = (userId, token) => {
        getUserAddresses(userId, token).then(data => {
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setTimeout(() => {
                    setAllAddresses(data);
                    setLoading(false);
                }, 500);
            }
        }).catch(err => console.log(err));
    };

    // preload necessary data when components builds first time
    useEffect(() => {
        const preloadData = () => {
            // Set the loading
            setLoading(true);
            // Get the user info and session token from the Browser's localsotrage
            const { user, token } = isAuthenticated() && isAuthenticated();
            if (user && token) {
                setUser({ ...user, id: user._id, token: token });
                loadUserAddress(user._id, token);
            }
        };
        // call the preload function to load the data
        preloadData();
    }, []);

    // Store the Address Id to identify the address
    // when click the delete button
    const onDeleteAddress = (id) => {
        setAddressId(id);
        // Show the delete confirmation box
        setDeleteConfirmationBox(true);
    };

    // Fire the Backend request and delete the specific address
    // from the database
    const onConfirmDelete = () => {
        setLoading(true);
        deleteUserAddress(addressId, id, token).then(data => {
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                loadUserAddress(id, token);
                setDeleteConfirmationBox(false);
            }
        }).catch(err => console.log(err));
    };

    return (
        <Fragment>
            <Head>
                <title>User Account</title>
            </Head>
            <Layout>
                {loading ? (
                    <div style={{ position: "relative", width: "100%", height: "500px", padding: "40px" }}>
                        <div className="spinner" style={{ "--width": "50px" }}></div>
                    </div>
                ) : (
                    <div className="user-profile-page my-address">
                        <div className="main-div">
                            <div className="row user-profile">
                                <div className="col-lg-3 sidebar">
                                    <Menu />
                                </div>
                                <div className="col-lg-9 content-box">
                                    <div className="header">
                                        <p>Your Addresses</p>
                                    </div>
                                    <div className="body">
                                        <div className="address-wrap">
                                            <div className="address-preview-wrap">
                                                <Addresses
                                                    allAddresses={allAddresses}
                                                    onDeleteAddress={onDeleteAddress}
                                                />
                                                <div className="add-new">
                                                    <button className="btn">
                                                        <a href={`${HOSTNAME}/user/address/new`}>
                                                            Add new address
                                                        </a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DeleteConfirmModal
                                        deleteConfirmationBox={deleteConfirmationBox}
                                        setDeleteConfirmationBox={setDeleteConfirmationBox}
                                        onConfirmDelete={onConfirmDelete}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {RedirectUserIfNotAuthenticated()}
            </Layout>
        </Fragment>
    );
};

export default Address;