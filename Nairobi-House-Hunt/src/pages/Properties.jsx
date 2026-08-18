import { useEffect, useState } from "react";
import { fetchProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";

function Properties(){
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [bedroomFilter, setBedroomFilter] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [favorites, setFavorites] = useState([]);


    //Fetching from API
    useEffect(() => {
        fetchProperties()
        .then((data)=> {setProperties(data);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    //Adding to favorites
    const toggleFavorite = (propertyId) => {
        setFavorites((currentFavorites) => {
            if (currentFavorites.includes(propertyId)) {
                return currentFavorites.filter((id) => id !== propertyId);
            }
            return [...currentFavorites, propertyId];
        });
    }; 
  //Searching for properties
    const filteredProperties = properties.filter((property) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            property.title?.toLowerCase().includes(search) ||
            property.location?.toLowerCase().includes(search) ||
            property.area?.toLowerCase().includes(search) ||
            property.city.toLowerCase().includes(search);
        const matchesBedrooms =
            bedroomFilter === "" ||
            (bedroomFilter === "5"
                ? property.bedrooms >= 5
                : property.bedrooms === Number(bedroomFilter));
        const matchesPrice =
                maxPrice === "" || property.price <= Number(maxPrice);
        return matchesSearch && matchesBedrooms && matchesPrice;    
    });
    const sortedProperties = [...filteredProperties];
    if (sortOption === "price-low") {
        sortedProperties.sort((a, b) => a.price -b.price);

    }
    if (sortOption === "price-high") {
        sortedProperties.sort((a, b) => b.price - a.price);
    }

    if (loading) {
        return <p>Loading Properties...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <main>
            
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="filter-container">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select
                id="bedrooms" 
                value={bedroomFilter}
                onChange={(event) => setBedroomFilter(event.target.value)}
                >
                    <option value="">Any</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms</option>
                </select>
            </div>
            <div className="filter-container">
                <label htmlFor="maxPrice">Maximum Monthly Rent</label>
                    <input 
                    type="number" 
                    id="maxPrice"
                    placeholder="e.g. 100000"
                    value={maxPrice}
                    onChange={(event) =>setMaxPrice(event.target.value)}
                />
            </div>
            <div className="filter-container">
                <label htmlFor="sort">Sort By</label>
                <select
                id="sort"
                value={sortOption}
                onChange={(event)=>setSortOption(event.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
            
            <p>{filteredProperties.length} properties found</p>
            <div className="property-grid">
                {sortedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} isFavorite={favorites.includes(property.id)} onToggleFavorite={toggleFavorite} />
                    ))}
            </div>

        </main>
    );

}
export default Properties;