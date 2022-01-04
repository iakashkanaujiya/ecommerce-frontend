import { useEffect, useState } from "react";

const AddressForm = ({ _address, onSubmitShippingAddress, setIsAddNewAddress, setIsEditAddress, loading }) => {

    //User Shipping Address, Take the Shiiping address from the user
    const [address, setAddress] = useState({
        firstname: "",
        lastname: "",
        address1: "",
        address2: "",
        country: "India",
        state: "",
        city: "",
        postalCode: "",
        primaryPhone: "",
        secondaryPhone: ""
    });

    // Destructer the shippingAddress object
    const {
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
    } = address;

    useEffect(() => {
        if (_address) {
            setAddress(_address);
        }
    }, []);

    // Clear the Input fields
    const clearInputFiels = () => {
        setAddress({
            ...address,
            firstname: "",
            lastname: "",
            address1: "",
            address2: "",
            state: "",
            city: "",
            postalCode: "",
            primaryPhone: "",
            secondaryPhone: ""
        });
    };

    //Handle the Shiiping Address Input, Store all the values in the shippingAddress state object
    const handleShippingAddress = (name) => (event) => {
        const value = event.target.value;
        setAddress({ ...address, [name]: value });

        if (name !== "secondaryPhone") {
            if (!value || value == "wrong") {
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

    // On Cancel Form 
    const handleCancel = () => {
        setAddress({
            ...address,
            firstname: "",
            lastname: "",
            address1: "",
            address2: "",
            country: "",
            state: "",
            city: "",
            postalCode: "",
            primaryPhone: "",
            secondaryPhone: ""
        });
        if (setIsAddNewAddress) {
            setIsAddNewAddress(false);
        } else {
            setIsEditAddress(null);
        }
    }


    return (
        <div role="form" className="address-form">
            <div className="fullname input-wrap">
                <div className="firstname">
                    <label>First Name<span>*</span></label>
                    <input
                        onChange={handleShippingAddress("firstname")}
                        value={firstname}
                        type="text"
                        name="firstname"
                    />
                </div>
                <div className="lastname">
                    <label>Last Name<span>*</span></label>
                    <input
                        onChange={handleShippingAddress("lastname")}
                        value={lastname}
                        type="text"
                        name="lastname"
                    />
                </div>
            </div>
            <div className="address">
                <div className="local-address input-wrap">
                    <label>Address<span>*</span></label>
                    <div style={{ marginBottom: "20px" }}>
                        <input
                            onChange={handleShippingAddress("address1")}
                            value={address1}
                            name="addressLine1"
                            type="text"
                            placeholder="Flat, House no., Building, Company, Apartment"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handleShippingAddress("address2")}
                            value={address2}
                            name="addressLine2"
                            type="text"
                            placeholder="Area, Colony, Street, Sector, Village"
                        />
                    </div>
                </div>
                <div className="city input-wrap">
                    <label>City <span>*</span></label>
                    <input 
                        onChange={handleShippingAddress("city")}
                        value={city}
                        type="text"
                        name="city"
                        placeholder="city name"
                    />
                </div>
                <div className="area-code input-wrap">
                    <label>Area Code <span>*</span></label>
                    <input
                        onChange={handleShippingAddress("postalCode")}
                        value={postalCode}
                        type="code"
                        name="pincode"
                        maxLength="6"
                        placeholder="Area Code/Postal Code"
                    />
                </div>
                <div className="state input-wrap">
                    <label>State <span>*</span></label>
                    <input
                        onChange={handleShippingAddress("state")}
                        value={state}
                        type="text"
                        name="state"
                        placeholder="state name"
                    />
                </div>
            </div>
            <div className="phone input-wrap">
                <div className="primary">
                    <label>Primary Phone<span>*</span></label>
                    <input
                        onChange={handleShippingAddress("primaryPhone")}
                        value={primaryPhone}
                        name="phone"
                        tabIndex="0"
                        type="text"
                        pattern="\d*"
                        maxLength="10"
                        inputMode="numeric"
                        placeholder="+91-0000000000"
                    />
                </div>
                <div className="secondary">
                    <label>Secondary Phone</label>
                    <input
                        onChange={handleShippingAddress("secondaryPhone")}
                        value={secondaryPhone}
                        name="alternatePhone"
                        type="tel"
                        tabIndex="0"
                        pattern="\d*"
                        maxLength="10"
                        inputMode="numeric"
                        placeholder="+91-0000000000"
                    />
                </div>
            </div>
            <div className="atomic-btns">
                <button className="btn save" onClick={() => { onSubmitShippingAddress(address, clearInputFiels) }}>
                    {loading ? (
                        <div style={{ "--color": "#fff" }} className="loader"></div>
                    ) : (
                        <span style={{ color: "#fff" }}>Save</span>
                    )}
                </button>
                <button className="btn cancel" onClick={handleCancel}>
                    <div>Cancel</div>
                </button>
            </div>
        </div>
    );
};

export default AddressForm;