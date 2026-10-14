import './Footer.css'
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/api/authService.js";

// SVG
import logo from '../../assets/icons/footer/logo.svg';
import instagramIcon from '../../assets/icons/footer/instagram.svg';
import facebookIcon from '../../assets/icons/footer/facebook.svg';
import twitterIcon from '../../assets/icons/footer/twitter.svg';
import youtubeIcon from '../../assets/icons/footer/youtube.svg';
import pinterestIcon from '../../assets/icons/footer/pinterest.svg';
import tiktokIcon from '../../assets/icons/footer/tiktok.svg';
import brineLogo from '../../assets/icons/footer/brine-logo.svg';
import warriorLogo from '../../assets/icons/footer/warror.svg';
import teamSportsLogo from '../../assets/icons/footer/teamsports-logo.svg';
import usFlag from '../../assets/icons/header/US.png';

function Footer() {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(getCurrentUser());

    function handleSignup() {
        navigate("/login");
    }
    return (
        <>
            <footer className="footer">

                {!isLoggedIn && (
                    <div className="footer-signup">
                        <p>Be the first to know about new arrivals</p>
                        <button onClick={handleSignup}>Sign up</button>
                    </div>
                )}

                <div className="footer-content">

                    <div className="footer-links">

                        <div className="footer-column">
                            <h3>Help</h3>

                            <Link to="/help" onClick={() => window.scrollTo(0, 0)}>Contact us</Link>
                            <Link to="/returns" onClick={() => window.scrollTo(0, 0)}>Start a return</Link>
                            <Link to="/order-status" onClick={() => window.scrollTo(0, 0)}>Track your order</Link>
                            <a href="#">Become a member</a>
                            <Link to="/size-guide" onClick={() => window.scrollTo(0, 0)}>Size guide</Link>
                            <Link to="/faqs" onClick={() => window.scrollTo(0, 0)}>FAQ</Link>
                        </div>

                        <div className="footer-column">
                            <h3>Shop</h3>

                            <Link to="/stores" onClick={() => window.scrollTo(0, 0)}>Find a store</Link>
                            <a href="#">Gift cards</a>
                            <a href="#">Shipping information</a>
                            <a href="#">Sale exclusions</a>
                            <a href="#">Custom uniforms</a>
                            <a href="#">Reconsidered</a>
                        </div>

                        <div className="footer-column">
                            <h3>About Us</h3>

                            <a href="#">Our Purpose</a>
                            <a href="#">Responsible leadership</a>
                            <a href="#">New Balance Foundation</a>
                            <a href="#">Careers</a>
                            <a href="#">The TRACK at New Balance</a>
                            <a href="#">Press box</a>
                            <a href="#">Medical Plan Information</a>
                        </div>

                        <div className="footer-column">
                            <h3>For You</h3>

                            <a href="#">Special discounts</a>
                            <a href="#">Idea submission</a>
                            <a href="#">Affiliate program</a>
                            <a href="#">Counterfeit products</a>
                            <a href="#">Accessibility statement</a>
                        </div>

                    </div>

                    <div className="footer-brand">

                        <h2>Fearlessly Independent</h2>

                        <Link to="/" onClick={() => window.scrollTo(0, 0)} aria-label="New Balance home">
                            <img className="footer-logo" src={logo} alt="New Balance"/>
                        </Link>

                        <p>
                            Independent since 1906, we empower people
                            through sport and craftsmanship to create
                            positive change in communities around the
                            world.
                        </p>

                        <div className="social-icons">
                            <img src={instagramIcon} alt="Instagram" />
                            <img src={facebookIcon} alt="Facebook" />
                            <img src={twitterIcon} alt="X" />
                            <img src={youtubeIcon} alt="YouTube" />
                            <img src={pinterestIcon} alt="Pinterest" />
                            <img src={tiktokIcon} alt="TikTok" />
                        </div>

                    </div>

                </div>

            </footer>

            <footer className="footer-secondary">

                <div className="footer-secondary-brands">
                    <span>New Balance family of brands</span>

                    <img src={brineLogo} alt="Brine" />
                    <img src={warriorLogo} alt="Warrior" />
                    <img src={teamSportsLogo} alt="Team Sports" />
                </div>

                <div className="footer-secondary-top">
                    <img className="US-flag" src={usFlag} alt="US Flag" />

                    <a href="#">US | English</a>

                    <a href="#">Privacy Policy</a>

                    <a href="#">Responsible Disclosure</a>

                    <a href="#">Website Terms & Conditions</a>

                    <a href="#">CA Supply Chains Act (SB 657) and Modern Slavery Act Statement</a>

                    <a href="#">Health Data Privacy Policy</a>

                    <a href="#">Do Not Sell or Share My Personal Information</a>
                </div>

                <div className="footer-secondary-bottom">
                    <p>Copyright 2026, New Balance</p>
                </div>

            </footer>

        </>
    )
}

export default Footer