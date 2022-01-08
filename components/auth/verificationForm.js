import React, { useEffect, useState } from 'react';

const VerificationForm = ({ error, loading, setError, onSubmitVerificationCode, phone, onSubmit }) => {

    const [code, setCode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: ""
    });

    const { first, second, third, fourth } = code;

    // Handle the user input
    const handleChange = (name) => (event) => {
        setError("");

        var validNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var value = event.target.value;

        if (value in validNumbers) {
            setCode({ ...code, [name]: value });
        } else {
            event.target.value = "";
        }
    };

    // Navigate to next input 
    const goToNextInput = (e) => {
        var key = e.which;
        var el = e.target;

        if (el.value != "" || key == 8) {
            var nsib = e.target.nextElementSibling;
            var psib = e.target.previousElementSibling;

            if (key !== 8) {
                !!nsib && nsib.focus();
            } else {
                if(!!el.value) {
                    el.value = "";
                    !!psib && psib.focus();
                } else {
                    !!psib && psib.focus();
                }
            }
        } else {
            setError("Only numbers are allowed.")
        }

    }

    const [seconds, setSeconds] = useState(30);
    const countDownTime = () => {
        setSeconds(seconds - 1);
    };

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => countDownTime(), 1000);
            return () => clearInterval(timerId);
        }
    });

    return (
        <form id="verification-form" className="form">
            <div className="signin-div form-div">
                <div className="body">
                    <div className="title">
                        <h5>Phone Number Verification</h5>
                        <p>Enter the verification code sent to your phone <span><strong>{"+91 " + phone}</strong></span></p>
                        <p
                            style={{ fontWeight: "100", color: "rgb(250, 0, 0)", marginTop: "10px" }}
                        >
                            {error}</p>
                    </div>
                    <div className="code-box input-div">
                        <div id="code-input" className="code-input">
                            <input
                                onChange={handleChange("first")}
                                onKeyUp={goToNextInput}
                                className="input first"
                                tabIndex="0"
                                type="text"
                                pattern="\d*"
                                maxLength="1"
                                inputMode="numeric"
                            />
                            <input
                                onChange={handleChange("second")}
                                onKeyUp={goToNextInput}
                                className="input second"
                                tabIndex="0"
                                type="text"
                                pattern="\d*"
                                maxLength="1"
                                inputMode="numeric"
                            />
                            <input
                                onChange={handleChange("third")}
                                onKeyUp={goToNextInput}
                                className="input third"
                                tabIndex="0"
                                type="text"
                                pattern="\d*"
                                maxLength="1"
                                inputMode="numeric"
                            />
                            <input
                                onChange={handleChange("fourth")}
                                onKeyUp={goToNextInput}
                                className="input fourth"
                                tabIndex="0"
                                type="text"
                                pattern="\d*"
                                maxLength="1"
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmitVerificationCode(first + second + third + fourth);
                            }}
                            className="btn login">
                            <span>
                                {loading ? <div className="loader" style={{ "--color": "#fff" }}></div> : <span>Verify</span>}
                            </span>
                        </button>
                        <div style={{ padding: "20px 0" }} className="options">
                            <button
                                style={{
                                    marginBottom: "10px",
                                    padding: "0",
                                    display: "block",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={(e) => {
                                    onSubmit(e)
                                    setSeconds(30)
                                }}
                                disabled={seconds !== 0}
                            >
                                <span>Resend code {seconds !== 0 && "(" + seconds + "sec" + ")"}</span>
                            </button>
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

export default VerificationForm;