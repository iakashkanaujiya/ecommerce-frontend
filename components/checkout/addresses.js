import { useEffect, useState } from "react";
import AddressForm from "./addressForm";
import NewAddress from "./newAddress";
import { updateUserAddress } from "../../api/user/user";

const Addresses = ({ preloading, addresses, userId, token, loadUserAddresses, deliveryAddress, setDeliveryAddress }) => {
    // Change the Delivery Address
    // By Default ChangeDeliveryAddress is set to true
    // This will show the option to select the Delivery address
    const [isChangeDeliveryAddress, setIsChangeDeliveryAddress] = useState(true);

    //isEditAddress will contain the Index value of the Address
    // This will have the Index position element of the Addresses array
    const [isEditAddress, setIsEditAddress] = useState(null);

    const [addressId, setAddressId] = useState("");
    const [address, setAddress] = useState("");
    const [isAddNewAddress, setIsAddNewAddress] = useState(false);

    // On select the Address, set the AddressId
    // This confirm which Address is currenty selected
    // This is not yet confimred delivery address
    const onSelectAddress = (id) => {
        setAddressId(id);
        setIsEditAddress(null);
    };

    // first Address will be selected by default for delivery address
    useEffect(() => {
        if (!!addresses.length) {
            setAddressId(addresses[0]._id);
        }

    }, [addresses]);

    // Edit the Existing Address
    const onEditAddress = (id, index) => {
        addresses.forEach((add) => {
            if (add._id === id) {
                setAddressId(add._id);
                const { firstname,
                    lastname,
                    address1,
                    address2,
                    country,
                    state,
                    city,
                    postalCode,
                    primaryPhone,
                    secondaryPhone
                } = add;
                setAddress({
                    firstname,
                    lastname,
                    address1,
                    address2,
                    country,
                    state,
                    city,
                    postalCode,
                    primaryPhone,
                    secondaryPhone
                });
                setIsEditAddress(index);
            }
        });
    };

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Update the User Address
    const onSubmitShippingAddress = (address, clearInputFiels) => {
        // Check the values if they are null
        const checkAddress = () => {
            return Object.keys(address).every((key) => {
                if (key !== "secondaryPhone" && !address[key]) {
                    return false;
                } else {
                    return true;
                }
            });
        };
        if (checkAddress()) {
            setLoading(true);
            updateUserAddress({ ...address, user: userId }, addressId, userId, token)
                .then(data => {
                    if (data.error) {
                        setError(error);
                    } else {
                        setTimeout(() => {
                            clearInputFiels();
                        }, 1400);
                        setTimeout(() => {
                            setLoading(false);
                            setIsEditAddress(null);
                            loadUserAddresses(userId, token);
                        }, 1500);
                    }
                }).catch(err => console.log(err));
        }
    };

    // Delivery Address
    const {
        firstname,
        lastname,
        address1,
        address2,
        state,
        city,
        postalCode,
        primaryPhone,
        secondaryPhone
    } = deliveryAddress;

    // Select the Delivery Address
    // This function will select the Delivery Address
    const onSelectDeliveryAddress = (id) => {
        addresses.forEach(add => {
            if (add._id == id) {
                const { firstname,
                    lastname,
                    address1,
                    address2,
                    country,
                    state,
                    city,
                    postalCode,
                    primaryPhone,
                    secondaryPhone
                } = add;
                setDeliveryAddress({
                    firstname,
                    lastname,
                    address1,
                    address2,
                    country,
                    state,
                    city,
                    postalCode,
                    primaryPhone,
                    secondaryPhone
                });
                setIsChangeDeliveryAddress(false);
            }
        })
    };

    // Change the Delivery Address
    const onChangeDeliverAddress = () => {
        setDeliveryAddress("");
        setIsChangeDeliveryAddress(true);
    };

    return (
        <div className="shipping-panel">
            <div className="addresses">
                {isChangeDeliveryAddress ? (
                    <div>
                        <div className="delivery-addresses">
                            <div className="header">
                                <span>1</span>
                                <span style={{ fontSize: "1rem" }}>Delivery Address</span>
                            </div>
                            {preloading ? (
                                <div style={{ padding: "60px 0", textAlign: "center" }}>
                                    <div style={{ "--width": "50px" }} className="loader"></div>
                                </div>
                            ) : (
                                !!addresses.length ? (
                                    addresses.map((add, index) => (
                                        <div key={index} className="wrapper">
                                            {isEditAddress == index ? (
                                                <>
                                                    <div style={{ background: "rgb(0 0 0 / 1%)" }}>
                                                        <div style={{ padding: "20px 0 0 20px" }}><h5>Edit Address</h5></div>
                                                        <AddressForm
                                                            _address={address}
                                                            setIsEditAddress={setIsEditAddress}
                                                            loading={loading}
                                                            onSubmitShippingAddress={onSubmitShippingAddress}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="address-wrap">
                                                    <div className="address">
                                                        <div className="input-select">
                                                            <input
                                                                type="radio"
                                                                name="address"
                                                                onChange={() => { onSelectAddress(add._id) }}
                                                                checked={addressId == add._id}
                                                            />
                                                        </div>
                                                        <div key={index} className="address-preview">
                                                            <p style={{ fontSize: "1.1rem" }}>{add.firstname} {add.lastname}</p>
                                                            <p>{add.address1}, {add.address2}, {add.city}, <br /> {add.state} - {add.postalCode}</p>
                                                            <p>{add.primaryPhone} {!!add.secondaryPhone && ", " + add.secondaryPhone}</p>
                                                        </div>
                                                        {addressId == add._id && (
                                                            <button
                                                                onClick={() => { onEditAddress(add._id, index) }}
                                                                className="btn edit"
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                    </div>
                                                    {addressId == add._id && (
                                                        <div className="btn-wrap">
                                                            <button
                                                                onClick={() => { onSelectDeliveryAddress(add._id) }}
                                                                className="btn deliver"
                                                            >
                                                                Delivery Here
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: "20px" }}>
                                        <p>You don't have any deliver address, please add a new address.</p>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="add-new-address">
                            {isAddNewAddress ? (
                                <NewAddress
                                    setIsAddNewAddress={setIsAddNewAddress}
                                    loadUserAddresses={loadUserAddresses}
                                    userId={userId}
                                    token={token}
                                />
                            ) : (
                                <div onClick={() => { setIsAddNewAddress(true) }} className="add-btn">
                                    <i className="bi bi-plus-square"></i>
                                    <span>ADD A NEW ADDRESS</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="delivery-address-wrap">
                        <div className="header">
                            <span>1</span>
                            <span style={{ fontSize: "1rem" }}>Delivery Address</span>
                        </div>
                        <div className="delivery-address">
                            <div className="address-preview">
                                <p style={{ fontSize: "1.1rem" }}>{firstname} {lastname}</p>
                                <p>{address1}, {address2}, {city}, <br /> {state} - {postalCode}, Phone - {primaryPhone} {!!secondaryPhone && ", " + secondaryPhone}</p>
                            </div>
                            <div className="btn-wrap">
                                <button onClick={onChangeDeliverAddress} className="btn change">Change</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Addresses;