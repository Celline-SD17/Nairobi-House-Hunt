import { Link } from "react-router-dom";
function Home(){
    return (
    <main className="home-page">
        <section className="hero">
            <video className="hero-video" autoPlay loop muted playsInline>
                <source src="/videos/nairobi-house-hunt.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">

                <p className="hero-label">RENTAL PROPERTIES IN NAIROBI</p>

                <h2>Find a place <br /> that feels like home.</h2>
                <p className = "hero-text">
                    Discover rental properties across Nairobi and find a place that fits your
                    needs and budget.
                </p>
                <Link to="/properties" className="browse-button">
                Browse Properties
                <span>→</span>
                </Link>
            </div> 
            <div className="hero-scroll">
                <span>Scroll to explore</span>
                <span className="scroll-arrow">↓</span>
            </div>
        </section>

        <section className="home-features">
            <div className="section-heading">
                <p className="section-label">
                    WHY HOUSE HUNTING HERE?
                </p>
            
                <h2>House hunting, <br /> made simpler.</h2>
                <p className="section-intro"> 
                    Spend less time searching and more time finding somewhere that feels right.
                </p>
            </div>
            
            <div className="feature-grid">
                <article className="feature">
                    <div className="feature-number">01</div>
                    <div className="feature-icon">🔎</div>
                    <h3>Search smarter</h3>
                    <p>Search properties by location, area, city, or property name to quickly narrow down your options.</p>

                </article>

                <article className="feature">
                    <div className="feature-number">02</div>
                    <div className="feature-icon">🎯</div> 
                    <h3>Filter what matters</h3> 
                    <p> Find homes that fit your needs by filtering for bedrooms and maximum monthly rent. </p>
               </article>

                <article className="feature"> 
                    <div className="feature-number">03</div> 
                    <div className="feature-icon">↕️</div> 
                    <h3>Compare with ease</h3> 
                    <p> Sort properties by price and save your favorites so promising homes are always easy to find again. </p>    
                </article>      
            </div>
                <div className="home-cta">
                     <div>
                        <p className="section-label"> READY TO START? </p> 
                        <h2> Your next home <br /> could be one click away. </h2> 
                    </div> 
                    <Link to="/properties" className="secondary-button" > Browse Listings <span>→</span> </Link> 
                </div>
        </section>
    </main>    
    );

}
export default Home;
