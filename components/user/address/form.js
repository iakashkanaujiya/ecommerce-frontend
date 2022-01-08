const AddressForm = (props) => {

    const {
        error,
        loading,
        success,
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
        handleInputChange,
        handleSubmit,
        onCancel
    } = props;

    return (
        <div className="address-wrap">
            <form className="address-form">
                {error ? (
                    <div className="message-div">
                        <p>{error}</p>
                    </div>
                ) : success && (
                    <div className="message-div">
                        <p>Address successfully added</p>
                    </div>
                )}
                <div className="fullname">
                    <div className="firstname">
                        <label>First Name<span>*</span></label>
                        <input
                            onChange={handleInputChange("firstname")}
                            value={firstname}
                            type="text"
                            name="firstname"
                            placeholder="Ex. Akash"
                        />
                    </div>
                    <div className="lastname">
                        <label>Last Name<span>*</span></label>
                        <input
                            onChange={handleInputChange("lastname")}
                            value={lastname}
                            type="text"
                            name="lastname"
                            placeholder="Kanaujiya"
                        />
                    </div>
                </div>
                <div className="address">
                    <div className="local-address">
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
                    <div className="city">
                        <label>City <span>*</span></label>
                        <input
                            onChange={handleInputChange("city")}
                            value={city}
                            type="text"
                            name="city"
                            placeholder="city name"
                        />
                    </div>
                    <div className="area-code">
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
                    <div className="state">
                        <label>State/Province <span>*</span></label>
                        <input
                            onChange={handleInputChange("state")}
                            value={state}
                            type="text"
                            name="state"
                            placeholder="state name"
                            style={{ width: "90%" }}
                        />
                    </div>
                </div>
                <div className="phone">
                    <div className="primary">
                        <label>Primary Phone<span>*</span></label>
                        <input
                            onChange={handleInputChange("primaryPhone")}
                            value={primaryPhone}
                            name="phone"
                            type="tel"
                        />
                    </div>
                    <div className="secondary">
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
                            <span>Save</span>
                        )}
                    </button>
                    <button
                        onClick={onCancel}
                        className="btn cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;