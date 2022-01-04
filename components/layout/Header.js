import DesktopHeader from "./Desktop/DesktopHeader"
import MobileHeader from "./Mobile/MobileHeader"


const Header = () => {
    return (
        <header id="site-header">
            <DesktopHeader />
            <MobileHeader />
        </header>
    );
};

export default Header;
