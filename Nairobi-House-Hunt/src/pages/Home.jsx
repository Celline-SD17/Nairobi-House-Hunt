import { Link } from "react-router-dom";
function Home(){
    return (
    <main>
        <section>
            <h1>Find Your Next Home in Nairobi</h1>
            <p>
                Discover rental properties across Nairobi and find a place that fits your
                needs and budget.
            </p>

            <Link to="/properties">Browse Properties</Link>
        </section>

        <section>
            <h2>Explore Nairobi</h2>
            <p>Browse rental properties in some of Nairobi's popular areas.</p>
            <div>
                <span>Kilimani</span>
                <span>Lavington</span>
                <span>Westlands</span>
                <span>Parklands</span>
            </div>
        </section>
    </main>    
    );

}
export default Home;
