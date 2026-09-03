import './MainHeader.css'
import { Link } from "react-router-dom";
import {useEffect, useRef} from "react";

function MainHeader({
                        theme = "dark",
                        containerRef
}) {
    const headerRef = useRef(null);

    useEffect(() => {
        const header = headerRef.current;
        const container = containerRef.current;

        if (!header || !container) return;

        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 70) {
                header.style.position = "absolute";
                header.style.width = "100%";
                header.style.left = "0";

                header.classList.remove("fixed", "hidden", "scrolled");
                lastScroll = 0;
                return;
            }

            header.style.position = "fixed";
            header.style.width = `${container.offsetWidth}px`;
            header.style.left = `${container.getBoundingClientRect().left}px`;

            header.classList.add("fixed", "scrolled");

            if (currentScroll > lastScroll) {
                header.classList.add("hidden");
            } else {
                header.classList.remove("hidden");
            }

            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [containerRef]);

    return (
        <>
            <header ref={headerRef} className={`main-header ${theme}`}>
                <div className="header-left">
                    <Link to="/">
                        <img className="logo" src="../src/assets/icons/header/logo.svg" alt="New Balance"/>
                    </Link>

                    <nav className="nav-menu">

                        <div className="nav-item has-dropdown">
                            <Link to={"/products?new=true"}>New</Link>

                            <div className="new-dropdown">

                                <Link to={"/products?gender=men&new=true"} className="new-card">
                                    <img src="../src/assets/images/new/mens-arrivals.jpg" alt=""/>
                                    <span>Men's new arrivals</span>
                                </Link>

                                <Link to={"/products?gender=women&new=true"} className="new-card">
                                    <img src="../src/assets/images/new/womens-arrivals.jpg" alt=""/>
                                    <span>Women's new arrivals</span>
                                </Link>

                                <Link to={"/products?gender=kids&new=true"} className="new-card">
                                    <img src="../src/assets/images/new/kids-arrivals.jpg" alt=""/>
                                    <span>Kids' new arrivals</span>
                                </Link>

                                <Link to={"#"} className="new-card">
                                    <img src="../src/assets/images/new/launch-calendar.jpg" alt=""/>
                                    <span>Launch calendar</span>
                                </Link>

                                <Link to={"#"} className="new-card">
                                    <img src="../src/assets/images/new/football-collection.jpg" alt=""/>
                                    <span>The international football collection</span>
                                </Link>
                            </div>
                        </div>

                        <div className="nav-item has-dropdown">
                            <Link to={"/products?gender=men"}>Men</Link>

                            <div className="mega-menu">

                                <div className="mega-column featured">
                                    <Link to={"/products?gender=men&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=men&new=true"}>New Arrivals</Link>
                                    <Link to={"#"}>Top Styles</Link>
                                    <Link to={"#"}>NB Lifestyle</Link>
                                    <Link to={"#"}>Made in USA</Link>
                                    <Link to={"#"}>Made in UK</Link>
                                    <Link to={"#"}>Launch Calendar</Link>
                                    <Link to={"#"}>Color Edit</Link>
                                    <Link to={"#"}>Klutch Athletics</Link>
                                    <Link to={"#"}>Reconsidered</Link>
                                    <Link to={"/products?sale=true"}>Sale</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SHOES</h4>
                                    <Link to={"/products?gender=men&type=footwear&category=shoes"}>All Shoes</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=running"}>Running</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=lifestyle"}>Lifestyle</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=basketball"}>Basketball</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=football"}>Football</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=tennis"}>Tennis</Link>
                                    <Link to={"/products?gender=men&type=footwear&activity=golf"}>Golf</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>CLOTHING</h4>
                                    <Link to={"/products?gender=men&type=clothing"}>All Clothing</Link>
                                    <Link to={"/products?gender=men&type=clothing&category=shirts"}>Shirts</Link>
                                    <Link to={"/products?gender=men&type=clothing&category=shorts"}>Shorts</Link>
                                    <Link to={"/products?gender=men&type=clothing&category=pants"}>Pants</Link>
                                    <Link to={"/products?gender=men&type=clothing&category=hoodies%20%26%20sweatshirts"}>Hoodies & Sweatshirts</Link>
                                    <Link to={"/products?gender=men&type=clothing&category=jackets%20%26%20vests"}>Jackets & Vests</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SPORTS</h4>
                                    <Link to={"/products?gender=men&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=men&activity=tennis"}>Tennis</Link>
                                    <Link to={"/products?gender=men&activity=running"}>Running</Link>
                                    <Link to={"/products?gender=men&activity=basketball"}>Basketball</Link>
                                    <Link to={"/products?gender=men&activity=football"}>Football</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>ACCESSORIES</h4>
                                    <Link to={"/products?gender=men&type=accessories"}>All Accessories</Link>
                                    <Link to={"/products?gender=men&type=accessories&category=hats%20%26%20gloves"}>Hats & Gloves</Link>
                                    <Link to={"/products?gender=men&type=accessories&category=socks"}>Socks</Link>
                                    <Link to={"/products?gender=men&type=accessories&category=bags"}>Bags</Link>
                                </div>
                            </div>
                        </div>


                        <div className="nav-item has-dropdown">
                            <Link to={"/products?gender=women"}>Women</Link>

                            <div className="mega-menu">

                                <div className="mega-column featured">
                                    <Link to={"/products?gender=women&activity=soccer"}>All Accessories</Link>
                                    <Link to={"/products?gender=women&new=true"}>New Arrivals</Link>
                                    <Link to={"#"}>Top Styles</Link>
                                    <Link to={"#"}>NB Lifestyle</Link>
                                    <Link to={"#"}>Made in USA</Link>
                                    <Link to={"#"}>Made in UK</Link>
                                    <Link to={"#"}>Launch Calendar</Link>
                                    <Link to={"#"}>Color Edit</Link>
                                    <Link to={"#"}>Klutch Athletics</Link>
                                    <Link to={"#"}>Reconsidered</Link>
                                    <Link to={"/products?sale=true"}>Sale</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SHOES</h4>
                                    <Link to={"/products?gender=women&type=footwear&category=shoes"}>All Shoes</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=running"}>Running</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=lifestyle"}>Lifestyle</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=basketball"}>Basketball</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=football"}>Football</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=tennis"}>Tennis</Link>
                                    <Link to={"/products?gender=women&type=footwear&activity=golf"}>Golf</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>CLOTHING</h4>
                                    <Link to={"/products?gender=women&type=clothing"}>All Clothing</Link>
                                    <Link to={"/products?gender=women&type=clothing&category=shirts"}>Shirts</Link>
                                    <Link to={"/products?gender=women&type=clothing&category=shorts"}>Shorts</Link>
                                    <Link to={"/products?gender=women&type=clothing&category=pants"}>Pants</Link>
                                    <Link to={"/products?gender=women&type=clothing&category=hoodies%20%26%20sweatshirts"}>Hoodies & Sweatshirts</Link>
                                    <Link to={"/products?gender=women&type=clothing&category=jackets%20%26%20vests"}>Jackets & Vests</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SPORTS</h4>
                                    <Link to={"/products?gender=women&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=women&activity=tennis"}>Tennis</Link>
                                    <Link to={"/products?gender=women&activity=running"}>Running</Link>
                                    <Link to={"/products?gender=women&activity=basketball"}>Basketball</Link>
                                    <Link to={"/products?gender=women&activity=football"}>Football</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>ACCESSORIES</h4>
                                    <Link to={"/products?gender=women&type=accessories"}>All Accessories</Link>
                                    <Link to={"/products?gender=women&type=accessories&category=hats%20%26%20gloves"}>Hats & Gloves</Link>
                                    <Link to={"/products?gender=women&type=accessories&category=socks"}>Socks</Link>
                                    <Link to={"/products?gender=women&type=accessories&category=bags"}>Bags</Link>
                                </div>

                            </div>
                        </div>

                        <div className="nav-item has-dropdown">
                            <Link to={"/products?gender=kids"}>Kids</Link>

                            <div className="mega-menu">

                                <div className="mega-column featured">
                                    <Link to={"#"}>Soccer</Link>
                                    <Link to={"#"}>New Arrivals</Link>
                                    <Link to={"#"}>School Uniform Shoes</Link>
                                    <Link to={"#"}>Top Styles</Link>
                                    <Link to={"#"}>Sibling Shop</Link>
                                    <Link to={"#"}>Wide Shoes</Link>
                                    <Link to={"#"}>Kid-friendly Closures</Link>
                                    <Link to={"#"}>Shoes under $75</Link>
                                    <Link to={"#"}>Sale</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SHOES</h4>
                                    <Link to={"#"}>All Shoes</Link>
                                    <Link to={"#"}>Big Kids (Size 3.5 - 7)</Link>
                                    <Link to={"#"}>Little Kids (Size 10.5 - 3)</Link>
                                    <Link to={"#"}>Babies & Toddlers (Size 0 - 10)</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>CLOTHING</h4>
                                    <Link to={"#"}>All Clothing</Link>
                                    <Link to={"#"}>Big Kids (Size 7Y - 16Y)</Link>
                                    <Link to={"#"}>Little Kids (Size 3Y - 6Y)</Link>
                                    <Link to={"#"}>Babies & Toddlers (Size 12M - 3T)</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>SPORTS</h4>
                                    <Link to={"#"}>All Sports</Link>
                                    <Link to={"/products?gender=kids&activity=soccer"}>Soccer</Link>
                                    <Link to={"/products?gender=kids&activity=tennis"}>Tennis</Link>
                                    <Link to={"/products?gender=kids&activity=running"}>Running</Link>
                                    <Link to={"/products?gender=kids&activity=basketball"}>Basketball</Link>
                                    <Link to={"/products?gender=kids&activity=football"}>Football</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>ACCESSORIES</h4>
                                    <Link to={"/products?gender=kids&type=accessories"}>All Accessories</Link>
                                    <Link to={"/products?gender=kids&type=accessories&category=hats%20%26%20gloves"}>Hats & Gloves</Link>
                                    <Link to={"/products?gender=kids&type=accessories&category=socks"}>Socks</Link>
                                    <Link to={"/products?gender=kids&type=accessories&category=bags"}>Bags</Link>
                                </div>
                            </div>
                        </div>

                        <div className="nav-item has-dropdown">
                            <Link to={"/products?sale=true"}>Sale</Link>

                            <div className="mega-menu">

                                <div className="mega-column featured">
                                    <h4>All Sale</h4>
                                    <Link to={"#"}>Under $50</Link>
                                    <Link to={"#"}>Under $100</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>MEN</h4>

                                    <Link to={"#"}>Shoes</Link>
                                    <Link to={"#"}>Clothing</Link>
                                    <Link to={"#"}>Accessories</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>WOMEN</h4>

                                    <Link to={"#"}>Shoes</Link>
                                    <Link to={"#"}>Clothing</Link>
                                    <Link to={"#"}>Accessories</Link>
                                </div>

                                <div className="mega-column">
                                    <h4>KIDS</h4>

                                    <Link to={"#"}>Shoes</Link>
                                    <Link to={"#"}>Clothing</Link>
                                    <Link to={"#"}>Accessories</Link>
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>

                <div className="header-icons">
                    <img className="search-icon" src="../src/assets/icons/header/search-icon.svg" alt=""/>
                    <Link to={"/login"} className="login-link">
                        <img className="account-icon" src="../src/assets/icons/header/account-icon.svg" alt=""/>
                    </Link>

                    <Link to={"/cart"} className="cart-link">
                        <img className="bag-icon" src="../src/assets/icons/header/bag-icon.svg" alt=""/>
                    </Link>

                </div>
            </header>
        </>
    )
}

export default MainHeader
