import './Home.css'
import MainHeader from "../../components/MainHeader/MainHeader.jsx";
import TopHeader from "../../components/TopHeader/TopHeader.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/productsService.js";
import { useNavigate } from "react-router-dom";

function Home() {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadProducts() {

            try {
                const data = await getProducts();

                setProducts(
                    data.filter(product => product.featured)
                );
            }
            catch(err){
                setError(err);
            }
            finally{
                setLoading(false);
            }
        }

        loadProducts();

    }, []);

    function handleShopNowBtn() {
        navigate("/products");
    }

    return (
        <>
            <TopHeader />
            <section ref={heroRef}
                     className="hero"
            >
                <MainHeader theme={"dark"} containerRef={heroRef}/>
                <div className="hero-content">
                    <h1>The 933</h1>

                    <p>Worn by Andrew Reynolds.</p>

                    <button onClick={handleShopNowBtn}>Shop now</button>
                </div>


                <video autoPlay muted loop id="video-background">
                    <source src="../src/assets/videos/new-balance-video.mp4" type="video/mp4"/>
                </video>
            </section>


            <main>
                <section className="categories">
                    <a href="#" className="category-card">
                        <img src="../src/assets/images/main-page/women.png" alt="Women"/>
                        <div className="overlay"></div>
                        <h2>Women</h2>
                    </a>

                    <a href="#" className="category-card">
                        <img src="../src/assets/images/main-page/men.png" alt="Men"/>
                        <div className="overlay"></div>
                        <h2>Men</h2>
                    </a>

                    <a href="#" className="category-card">
                        <img src="../src/assets/images/main-page/kids.png" alt="Kids"/>
                        <div className="overlay"></div>
                        <h2>Kids</h2>
                    </a>
                </section>

                <section className="grey-days">
                    <div className="grey-days-content">
                        <h2>Grey Days 2026</h2>
                        <p>
                            Grey Days is an annual celebration of everything that New Balance represents. This
                            month-long event
                            brings together our family of ambassadors and athletes for a range of special-edition
                            products, events,
                            and stories that highlight the unique and timeless qualities of the color grey.
                        </p>
                        <button>The Grey Shop</button>
                    </div>
                </section>


                <section className="product-grid">
                    {loading && <p>Loading products...</p>}

                    {error && <p>Failed to load products.</p>}

                    {!loading && !error &&
                        products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                page={"home"}
                            />
                        ))
                    }
                </section>

                <section className="featured-products">
                    <div className="featured-card">
                        <img src="../src/assets/images/main-page/NB10165_HCB_SideBySide_Desktop_U9060GRY_Image_1.jpg" alt="The 9060"/>

                        <div className="featured-info">
                            <h2>The 9060</h2>
                            <p>Modern expressionism.</p>
                            <button onClick={handleShopNowBtn}>Shop now</button>
                        </div>
                    </div>

                    <div className="featured-card">
                        <img src="../src/assets/images/main-page/NB10165_SideBySide_Amine_1890_Mobile_1x1-1.jpg" alt="ABZORB 1890"/>

                        <div className="featured-info">
                            <h2>ABZORB 1890</h2>
                            <p>Worn by Aminé.</p>
                            <button onClick={handleShopNowBtn}>Shop now</button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Home
