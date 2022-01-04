import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const HOSTNAME = process.env.HOSTNAME;

const ProductsFilter = ({ categories, category }) => {

    const router = useRouter();

    // Necessary State Variables
    const [showFilterOption, setShowFilterOption] = useState(false);
    const [categoryId, setCategoryId] = useState("");

    // Handle Change Filter Option
    const handleChangeFilterOption = (e) => {
        setCategoryId(e.target.value);
    };

    const onSelectFilterOption = () => {
        if (categoryId) {
            setShowFilterOption(false);
            router.push(`${HOSTNAME}/products/category/${categoryId}`);
        }
    };

    return (
        <div className="product-filter">
            <div className="wrap">
                <button onClick={() => { setShowFilterOption(true) }} className="selector">
                    <span className="label">Filter</span>
                    <div className="selected-option">
                        <span style={{ marginRight: "10px" }}>
                            {category}
                        </span>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </button>
                <div className={showFilterOption ? "filter-options show" : "filter-options"}>
                    <div className="header">
                        <div className="title">Filter & Options</div>
                        <button onClick={() => { setShowFilterOption(false) }} className="btn close">X</button>
                    </div>
                    <div className="content">
                        <ul className="options-list">
                            {categories.map((cate, index) => (
                                <li key={index} className="option">
                                    <input
                                        onChange={handleChangeFilterOption}
                                        type="radio"
                                        value={cate._id}
                                        name="radio"
                                        className="input"
                                    />
                                    <span>{cate.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="select-btn-wrap">
                        <button onClick={onSelectFilterOption} className="btn select">select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsFilter;