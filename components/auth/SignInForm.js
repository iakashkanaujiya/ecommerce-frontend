import React from 'react';

const SignInForm = ({ onChange, onSubmit, error, loading, phone }) => {

    return (
        <form id="signin-form" className="form">
            <div className="signin-div form-div">
                <div className="body">
                    <div className="title">
                        <h5>Phone Number Verifaction</h5>
                        <p>Enter your phone number to Login/Signup</p>
                        <p
                            style={{ fontWeight: "100", color: "rgb(250, 0, 0)", marginTop: "10px" }}
                        >
                            {error}
                        </p>
                    </div>
                    <div className="phone-box input-div">
                        <label htmlFor="phone">Phone <span style={{ color: "red" }}>*</span></label>
                        <div className="phone-input">
                            <i className="bi bi-phone-fill">+91</i>
                            <input onChange={onChange} type="text" name="phone" pattern="\d*" maxLength="10" />
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button onClick={onSubmit} className="btn login" disabled={!phone}>
                            <span>
                                {loading ? <div className="loader" style={{ "--color": "#fff" }}></div> : <span>Next</span>}
                            </span>
                        </button>
                        <div style={{ padding: "20px 0" }} className="options nav">
                            <a href="/">
                                <i style={{ textDecoration: "underline" }}>← Back to Home Page</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;