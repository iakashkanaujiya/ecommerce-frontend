import { useEffect, useState } from "react";
import CarouselSlider from "react-slick";

const Slider = () => {

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className="slider-next-btn"
                onClick={onClick}
            >
                <i style={{fontSize: "16px"}} className="bi bi-arrow-right"></i>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className="slider-pre-btn"
                onClick={onClick}
            >
                <i style={{ fontSize: "16px" }} className="bi bi-arrow-left"></i>
            </div>
        );
    }


    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="slider-container">
            <div className="desktop">
                <CarouselSlider {...settings}>
                    <div>
                        <img src="/assets/images/slider/1.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/2.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/3.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/4.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/5.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/6.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/7.png" alt="rk products" />
                    </div>
                    <div>
                        <img src="/assets/images/slider/8.png" alt="rk products" />
                    </div>
                </CarouselSlider>
            </div>
        </div>
    );
};

export default Slider;