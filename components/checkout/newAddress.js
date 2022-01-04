import { useState } from "react";
import { addUserAddress } from "../../api/user/user";
import AddressForm from "./addressForm";

const NewAddress = ({ setIsAddNewAddress, loadUserAddresses, userId, token }) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // on Submit Shipping address
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
            addUserAddress({ ...address, user: userId }, userId, token).then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setTimeout(() => {
                        clearInputFiels();
                    }, 1400);
                    setTimeout(() => {
                        setLoading(false);
                        setIsAddNewAddress(false);
                        loadUserAddresses(userId, token);
                    }, 1500);
                }
            }).catch(err => console.log(err));
        }
    };

    return (
        <div className="new-address-from">
            <div className="title">
                <h5>Add a new address</h5>
            </div>
            <AddressForm
                onSubmitShippingAddress={onSubmitShippingAddress}
                setIsAddNewAddress={setIsAddNewAddress}
                loading={loading}
            />
        </div>
    )
};

export default NewAddress;