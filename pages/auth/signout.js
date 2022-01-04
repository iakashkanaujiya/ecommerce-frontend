import { useEffect, useState } from "react";
import { signOut } from "../../api/auth/authApi";
import Redirect from "../../Redirect";

const SignOut = () => {

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        signOut(() => {
            setSuccess(true);
        });
    }, []);

    return (
        <>
            {success && <Redirect to="/" />}
        </>
    );
};

export default SignOut;