import './Footer.css'
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    function handleSignup() {
        navigate("/login");
    }
    return (
        <>
            <footer className="footer">

                <div className="footer-signup">
                    <p>Be the first to know about new arrivals</p>
                    <button onClick={handleSignup}>Sign up</button>
                </div>

                <div className="footer-content">

                    <div className="footer-links">

                        <div className="footer-column">
                            <h3>Help</h3>

                            <a href="#">Contact us</a>
                            <a href="#">Start a return</a>
                            <a href="#">Track your order</a>
                            <a href="#">Become a member</a>
                            <a href="#">Size guide</a>
                            <a href="#">FAQ</a>
                        </div>

                        <div className="footer-column">
                            <h3>Shop</h3>

                            <a href="#">Find a store</a>
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

                        <img className="footer-logo" src="../src/assets/icons/footer/logo.svg" alt="New Balance"/>

                        <p>
                            Independent since 1906, we empower people
                            through sport and craftsmanship to create
                            positive change in communities around the
                            world.
                        </p>

                        <div className="social-icons">
                            <img src="../src/assets/icons/footer/instagram.svg" alt="Instagram"/>
                            <img src="../src/assets/icons/footer/facebook.svg" alt="Facebook"/>
                            <img src="../src/assets/icons/footer/twitter.svg" alt="X"/>
                            <img src="../src/assets/icons/footer/youtube.svg" alt="YouTube"/>
                            <img src="../src/assets/icons/footer/pinterest.svg" alt="Pinterest"/>
                            <img src="../src/assets/icons/footer/tiktok.svg" alt="TikTok"/>
                        </div>

                    </div>

                </div>

            </footer>

            <footer className="footer-secondary">

                <div className="footer-secondary-brands">
                    <span>New Balance family of brands</span>

                    <img src="../src/assets/icons/footer/brine-logo.svg" alt="Brine"/>
                    <img src="../src/assets/icons/footer/warror.svg" alt="Warrior"/>
                    <img src="../src/assets/icons/footer/teamsports-logo.svg" alt="Team Sports"/>
                </div>

                <div className="footer-secondary-top">
                    <img className="US-flag" src="../src/assets/icons/header/US.png" alt="US Flag"/>

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
