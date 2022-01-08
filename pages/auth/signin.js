import React, { Fragment, useState } from 'react';
import Head from 'next/head';

// API Methods
import { signIn, signUp, authenticate } from "../../api/auth/authApi";
import { useRouter } from "next/router";

// components
import SignInForm from '../../components/auth/SignInForm';
import VerificationForm from '../../components/auth/verificationForm';

// Functional component
const SignIn = () => {

    // router object
    const router = useRouter();

    // stateful varibale
    const [user, setUser] = useState({});
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [verification, setVerification] = useState(false);
    const [redirect, setRedirect] = useState(false);

    //redirect to home page when successful login
    const redirectToHomePage = () => {
        if (redirect) {
            router.back();
        }
    };

    //store the user phone number input
    const onChange = event => {
        setError("");
        setLoading(false);
        setPhone(event.target.value);
    };

    //Submit the user signIn
    const onSubmit = event => {
        event.preventDefault();
        // Set the Error empty, if there was previously
        setError("");
        // Set the loading
        setLoading(true);
        //fire the backend request
        const phoneNumber = "+91" + phone;
        signUp(phoneNumber).then((data) => {
            if (data.error) {
                setLoading(false);
                setError(data.error);
            } else {
                setUser(data);
                setLoading(false);
                setVerification(true);
            }
        }).catch(err => console.log(err));
    };

    // Complete the SignIN on submit the verification code
    const onSubmitVerificationCode = (inputCode) => {
        if (parseInt(inputCode) !== user.verificationCode) {
            setError("Please enter the valid code");
        } else {
            //Set loading
            setLoading(true);
            // Fire the SignIn request to complete the Sign In
            signIn(user.user._id).then(data => {
                if (data.error) {
                    setLoading(false);
                    setError(data.error);
                } else {
                    authenticate(data, () => {
                        setRedirect(true);
                        setLoading(false);
                    });
                }
            }).catch(err => console.log(err));
        }
    };

    return (
        <Fragment>
            <Head>
                <title>User SignIn</title>
            </Head>
            <div className="signin-page form-container-wrap">
                {!verification ? (
                    <SignInForm
                        phone={phone}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        error={error}
                        loading={loading}
                    />
                ) : (
                    <VerificationForm
                        phone={phone}
                        onSubmitVerificationCode={onSubmitVerificationCode}
                        onSubmit={onSubmit}
                        error={error}
                        loading={loading}
                        setError={setError}
                    />
                )}
            </div>
            {redirectToHomePage()}
        </Fragment>
    );
};

export default SignIn;