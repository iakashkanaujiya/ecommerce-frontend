import { Fragment } from "react";
import Link from "next/link";

const HOSTNAME = process.env.HOSTNAME;

const Addresses = ({ allAddresses, onDeleteAddress }) => {
    return (
        <Fragment>
            {allAddresses.map((add, index) => {
                return (
                    <div key={index} className="address-preview">
                        <p>{add.firstname + " " + add.lastname}</p>
                        <p>{add.address1 + ", " + add.address2}</p>
                        <p>{add.city + ", " + add.state + ", " + add.postalCode}</p>
                        <p>{add.primaryPhone}{!!add.secondaryPhone && (<span>, {add.secondaryPhone}</span>)}</p>
                        <button className="btn edit">
                            <Link href={`${HOSTNAME}/user/address/edit/${add._id}`}>Edit</Link>
                        </button>
                        <button
                            onClick={() => { onDeleteAddress(add._id) }}
                            className="btn delete"
                        >
                            Delete
                        </button>
                    </div>
                )
            })}
        </Fragment>
    )
};

export default Addresses;