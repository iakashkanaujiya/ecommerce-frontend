import Link from "next/link";
import { useRouter } from "next/router";
const HOSTNAME = process.env.HOSTNAME;

const SideBar = ({ categories, subCategories }) => {

    const router = useRouter();
    const subCate = router.query.subCategory;

    const handleFilterChange = (event) => {
        const subCategoryId = event.target.value;
        router.push(`${HOSTNAME}/products/category/sub/${subCategoryId}`)
    };

    return (
        <div className="desktop-sidebar">
            <div className="sidebar-menu">
                <h5 className="title">Products Category</h5>
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link href={`${HOSTNAME}/products`}>All Products</Link>
                    </li>
                    {categories.map((category, index) => {
                        return (
                            <li key={index} className="menu-item">
                                <Link href={`${HOSTNAME}/products/category/${category._id}`}>{category.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="products-filter">
                <h5 className="title">Filter Products</h5>
                <ul className="filter-options-list">
                    {subCategories.map((category, index) => {
                        return (
                            <li key={index} className="filter-option">
                                <input onChange={handleFilterChange} value={category._id} type="radio" name="filter" checked={subCate == category._id} />
                                <label htmlFor="text">{category.name}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;