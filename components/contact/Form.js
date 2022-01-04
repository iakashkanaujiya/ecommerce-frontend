const Form = ({onFocus, onBlur, onChange, labelClassName}) => {
    return (
        <form name="myForm">
            <div className="inputfield fullname-box">
                <label className={labelClassName.fullname} htmlFor="fullname">Full name <span style={{ color: "red" }}>*</span></label>
                <input
                    type="text"
                    name="fullname"
                    required
                    onFocus={() => { onFocus("fullname") }}
                    onBlur={() => { onBlur("fullname") }}
                    onChange={onChange("fullname")}
                />
            </div>
            <div className="inputfield email-box">
                <label className={labelClassName.email} htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
                <input
                    type="email"
                    name="email"
                    required
                    onFocus={() => { onFocus("email") }}
                    onBlur={() => { onBlur("email") }}
                    onChange={onChange("email")}
                />
            </div>
            <div className="inputfield phone-box">
                <label className={labelClassName.phone} htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    onFocus={() => { onFocus("phone") }}
                    onBlur={() => { onBlur("phone") }}
                    onChange={onChange("phone")}
                />
            </div>
            <div className="inputfield message-box">
                <label className={labelClassName.textarea} htmlFor="message">Your message <span style={{ color: "red" }}>*</span></label>
                <textarea
                    name="message"
                    aria-required="true"
                    aria-invalid="false"
                    cols="50"
                    rows="10"
                    onFocus={() => { onFocus("textarea") }}
                    onBlur={() => { onBlur("textarea") }}
                    onChange={onChange("textarea")}
                >
                </textarea>
            </div>
            <div className="submit-button">
                <button type="submit">Submit</button>
                {/* <div id="contact-page-spinner" class="loader"
                                                style={{ width: "30px", height: "30px", border: "5px solid #D9C6C5", borderTop: "5px solid #000" }}>
                                            </div> */}
            </div>
        </form>
    );
};

export default Form;