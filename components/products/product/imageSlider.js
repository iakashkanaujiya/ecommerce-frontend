import { useState } from "react";
const ImageRootPath = process.env.BACKEND_HOSTNAME;

const ImageSlider = ({ images }) => {

    // Product Image Slider
    const [x, setX] = useState(0);
    const [count, setCount] = useState(1);
    const imageCount = images.length;

    const goToNextSlide = () => {
        if (count < imageCount) {
            setX(x - 100);
            setCount(count + 1);
        } else {
            setX(0);
            setCount(1)
        }
    };

    const goToPreviousSlide = () => {
        if (x !== 0) {
            setX(x + 100);
            setCount(count - 1);
        }
    }

    const onClickDot = (index) => {
        if (index === 0) {
            setX(0);
            setCount(1);
        } else {
            setX(index * -100);
            setCount(index + 1);
        }
    };

    const onOpenImageSlider = (e) => {
        if (window !== "undefined") {
            if (window.screen.width < 576) {
                e
                    .target
                    .parentElement
                    .parentElement
                    .parentElement
                    .parentElement
                    .className = "image-slider active";
            }
        }
    };

    const onCloseImageSlider = (e) => {
        e.target.parentElement.className = "image-slider";
    }

    return (
        <div className="image-slider">
            <button onClick={onCloseImageSlider} className="btn close">X</button>
            <button onClick={goToPreviousSlide} className="btn pre">
                <i className="bi bi-chevron-left"></i>
            </button>
            <button onClick={() => { goToNextSlide() }} className="btn next">
                <i className="bi bi-chevron-right"></i>
            </button>
            <ul className="slider-track">
                {images.map((img, index) => (
                    <li className="slide" key={index} style={{ transform: `translateX(${x}%)` }}>
                        <div className="img-wrap">
                            <img
                                onClick={onOpenImageSlider}
                                src={`${ImageRootPath}/${img.src}`} alt={img.alt}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="slide-dots">
                {images.map((img, index) => (
                    <div
                        onClick={() => { onClickDot(index) }}
                        key={index}
                        className={index == count - 1 ? "dot active" : "dot"}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;