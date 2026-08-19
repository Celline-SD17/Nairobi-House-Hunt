function About(){
    return (
        <main className="about-page">
            <section className="about-intro">
                <h2>About Nairobi House Hunt</h2>
                <p>
                Nairobi House Hunt is a property search application designed to make
                finding rental homes in Nairobi simpler and more convenient.
                </p>
                <p>
                House hunting in Nairobi involves going to different towns, viewing different properties, 
                and comparing them based on location, number of bedrooms, and price.
                Nairobi House Hunt brings these options together in a simple,
                user-friendly interface.
                </p>
            </section>

      <section className="about-section">
        <h2>The Problem</h2>

        <p>
          Finding a suitable rental property can be time-consuming. Renters
          often have specific requirements such as a particular location,
          number of bedrooms, and a maximum monthly budget, making it difficult
          to quickly narrow down available options.
        </p>
      </section>

      <section className="about-section">
        <h2>The Solution</h2>

        <p>
          Nairobi House Hunt allows users to search through rental properties
          and narrow their results based on the things that matter most to
          them.
        </p>

        <ul>
          <li>Search properties by location, area, city, or title.</li>
          <li>Filter properties by number of bedrooms.</li>
          <li>Set a maximum monthly rental budget.</li>
          <li>Sort properties by price.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>

        <div className="how-it-works">
          <div>
            <h3>1. Search</h3>
            <p>
              Search for properties using locations, areas, cities, or
              property names.
            </p>
          </div>

          <div>
            <h3>2. Filter</h3>
            <p>
              Narrow your options by selecting the number of bedrooms and
              setting your maximum monthly rent.
            </p>
          </div>

          <div>
            <h3>3. Sort</h3>
            <p>
              Sort the available properties by price to help you find options
              that fit your budget.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Authentication and Authorization</h2>
        <p>
          Authentication and authorization will also allow users to create
          accounts and eventually manage their own property-related data and
          preferences.
        </p>
      </section>
    </main>
  );
}

export default About;
