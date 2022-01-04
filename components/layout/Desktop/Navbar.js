import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../../api/product/category';
const HOSTNAME = process.env.HOSTNAME;

const Navbar = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setCategories(data);
                }
            }).catch(err => console.log(err));
    }, []);

    const [MenuBar, SetMenuBar] = useState(false);
    const MenuBarClass = MenuBar ? "sub-navbar active" : "sub-navbar";

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li onMouseOver={() => { SetMenuBar(true) }} onMouseOut={() => { SetMenuBar(false) }} className="menu-item products">
                    <a href="#">Products</a>
                    <div className={MenuBarClass}>
                        <div className="row-1">
                            <div className="column-1">
                                <ul className="sab-nav-menu">
                                    <li className="nav-item">
                                        <a href={`${HOSTNAME}/products`}>All Products</a>
                                    </li>
                                    {categories.map((category, index) => (
                                        <li key={index} className="nav-item">
                                            <a href={`${HOSTNAME}/products/category/${category._id}`}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="menu-item">
                    <a href={`${HOSTNAME}/about`}>Company</a>
                </li>
                <li style={{ paddingRight: "0px" }} className="menu-item">
                    <a href={`${HOSTNAME}/contact`}>Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;