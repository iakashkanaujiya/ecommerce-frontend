import { Fragment, useState } from 'react';
import Head from "next/head";

// components
import Layout from "../../components/layout/Layout"
import Form from "../../components/contact/Form";

const Contact = () => {

    const [userInput, setUserInput] = useState({
        fullname: "",
        email: "",
        phone: "",
        textarea: ""
    });

    const [labelClassName, setLabelClassName] = useState({
        fullname: "",
        email: "",
        textarea: ""
    });

    const [blur, setBlur] = useState({
        fullname: true,
        email: true,
        phone: true,
        textarea: true
    });

    const onFocus = (name) => {
        setLabelClassName({ ...labelClassName, [name]: "active" });
    };

    const onBlur = (name) => {
        blur[name] && setLabelClassName({ ...labelClassName, [name]: "" });
    };

    const onChange = name => event => {
        if (event.target.value.length !== 0) {
            setBlur({ ...blur, [name]: false });
            setUserInput({ ...userInput, [name]: event.target.value });
        } else if (event.target.value.length === 0) {
            setBlur({ ...blur, [name]: true });
            setUserInput({ ...userInput, [name]: event.target.value });
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Contact</title>
            </Head>
            <Layout>
                <main id="contact">
                    <div className="conact-box-wrap">
                        <div className="panel">
                            <div className="panel-column-1">
                                <Form
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    labelClassName={labelClassName}
                                />
                            </div>
                            <div className="panel-column-2">
                                <div className="content-box">
                                    <div className="title">
                                        <h2>Find us here!</h2>
                                        <p style={{marginBottom: "10px"}}>
                                            Govindpuram D-Block, Ghaziabad 201013
                                        </p>
                                        <p>Customer support: +91 7007694698</p>
                                    </div>
                                    <div className="owner-address">
                                        <div className="map-img">
                                            <iframe 
                                            width="100%" 
                                            height="250" 
                                            id="gmap_canvas" 
                                            src="https://maps.google.com/maps?q=Apni%20kirana%20Dukaan%20Kannauj&t=&z=7&ie=UTF8&iwloc=&output=embed" 
                                            frameborder="0" 
                                            scrolling="no" 
                                            marginheight="0" 
                                            marginwidth="0"
                                            />
                                        </div>
                                        <a className="find-us-map-btn" href="https://goo.gl/maps/E4YKaLDbECEfQTvYA"
                                            target="blank">Find us on map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </Fragment>
    );
};

export default Contact