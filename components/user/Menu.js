const Menu = () => {
    return (
        <ul className="sidebar-menu">
            <li className="menu-item">
                <a href="/user/profile">
                    <i className="bi bi-person-fill"></i>
                    <span>My Profile</span>
                </a>
            </li>
            <li className="menu-item">
                <a href="/user/orders">
                    <i className="bi bi-cart4"></i>
                    <span>My Orders</span>
                </a>
            </li>
            <li className="menu-item">
                <a href="/user/address">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Manage Address</span>
                </a>
            </li>
            <li className="menu-item">
                <a href="/contact">
                    <i className="bi bi-telephone-outbound-fill"></i>
                    <span>Contact Us</span>
                </a>
            </li>
            <li className="menu-item">
                <a href="/auth/signout">
                    <i className="bi bi-person-x-fill"></i>
                    <span>Sign Out</span>
                </a>
            </li>
        </ul>
    );
}

export default Menu;