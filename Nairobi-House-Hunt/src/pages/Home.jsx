import { Link } from "react-router-dom";
function Home(){
    return (
    <main className="home-page">
        <section className="hero">
            <div className="hero-content">
                <p className="hero-label">NAIROBI RENTAL PROPERTIES </p>

                <h2>Find a place that feels like home.</h2>
                <p>
                Discover rental properties across Nairobi and find a place that fits your
                needs and budget.
                </p>
                <Link to="/properties" className="browse-button">Browse Properties</Link>

            </div> 
        </section>

        <section className="home-features">
            <h2>House hunting made simpler</h2>
            <p>Find properties faster by narrowing your search to what matters most.</p>
            <div className="feature-grid">
                <div className="feature">
                    <h3>🔎 Search</h3>
                    <p>Search properties by location, area, city, or property name.</p>
                </div>
                <div className="feature">
                    <h3>🎯 Filter</h3>
                    <p>Narrow your options by bedrooms and maximum monthly rent.</p>
                </div>
                <div className="feature">
                    <h3>↕️ Sort</h3>
                    <p>
                    Sort available properties by price to find options within your
                    budget.
                    </p>
                </div>
            </div>
        </section>
    </main>    
    );

}
export default Home;
