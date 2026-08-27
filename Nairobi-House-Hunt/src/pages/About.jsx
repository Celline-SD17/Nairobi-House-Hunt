
function About() {
    return (
        <main className="about-page">
            <section className="about-intro">
                <p className="about-eyebrow">
                    NAIROBI HOUSE HUNT · ABOUT
                </p>

                <h2>
                    Finding a home in Nairobi
                    <br />
                    shouldn't feel this hard.
                </h2>

                <p className="about-lead">
                    Nairobi House Hunt is a property search application
                    designed to make finding rental homes across Nairobi
                    simpler, faster, and more convenient.
                </p>

                <p>
                    Instead of jumping between different listings and trying
                    to remember which properties fit your budget and needs,
                    Nairobi House Hunt brings the search experience together
                    in one place.
                </p>
            </section>

            <section className="about-section about-story">
                <div className="about-section-heading">
                    <p className="section-label">THE PROBLEM</p>
                    <h2>House hunting can be exhausting.</h2>
                </div>

                <p>
                    Finding a suitable rental property can take time. Renters
                    often have specific requirements such as a particular
                    neighbourhood, number of bedrooms, and maximum monthly
                    budget, making it difficult to quickly narrow down the
                    available options.
                </p>
            </section>

            <section className="about-section about-solution">
                <div className="about-section-heading">
                    <p className="section-label">THE SOLUTION</p>
                    <h2>Search for what actually matters.</h2>
                </div>

                <p>
                    Nairobi House Hunt lets users explore available rental
                    properties and narrow their results according to the
                    details that matter most to them.
                </p>

                <div className="about-capabilities">
                    <div className="about-capability">
                        <span>01</span>
                        <h3>Search</h3>
                        <p>
                            Search by location, area, city, or property title.
                        </p>
                    </div>

                    <div className="about-capability">
                        <span>02</span>
                        <h3>Filter</h3>
                        <p>
                            Narrow results by bedrooms and maximum monthly
                            rent.
                        </p>
                    </div>

                    <div className="about-capability">
                        <span>03</span>
                        <h3>Sort</h3>
                        <p>
                            Compare available properties by price.
                        </p>
                    </div>

                    <div className="about-capability">
                        <span>04</span>
                        <h3>Save</h3>
                        <p>
                            Save promising properties and manage your
                            favorites.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-section-heading">
                    <p className="section-label">HOW IT WORKS</p>
                    <h2>From search to shortlist.</h2>
                </div>

                <div className="how-it-works">
                    <article className="how-it-works-card">
                        <span>01</span>
                        <h3>Search</h3>
                        <p>
                            Explore rental properties across Nairobi using
                            locations, areas, cities, or property names.
                        </p>
                    </article>

                    <article className="how-it-works-card">
                        <span>02</span>
                        <h3>Refine</h3>
                        <p>
                            Use bedroom, budget, and price sorting options to
                            narrow your choices.
                        </p>
                    </article>

                    <article className="how-it-works-card">
                        <span>03</span>
                        <h3>Save</h3>
                        <p>
                            Create an account, save properties, and keep notes
                            on the listings you want to remember.
                        </p>
                    </article>

                    <article className="how-it-works-card">
                        <span>04</span>
                        <h3>Connect</h3>
                        <p>
                            Open a full listing to view property details and
                            contact the landlord directly.
                        </p>
                    </article>
                </div>
            </section>

            <section className="about-section about-auth">
                <div className="about-section-heading">
                    <p className="section-label">BUILT FOR TWO SIDES</p>
                    <h2>Hunters search. Landlords manage.</h2>
                </div>

                <div className="about-auth-grid">
                    <div>
                        <span className="about-role">HOUSE HUNTERS</span>
                        <p>
                            Hunters can create accounts, save favorite
                            properties, add notes, and access full listing
                            details including landlord contact information.
                        </p>
                    </div>

                    <div>
                        <span className="about-role">LANDLORDS</span>
                        <p>
                            Landlords can create accounts, add properties,
                            update their listings, and remove properties they
                            no longer want to advertise.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;

