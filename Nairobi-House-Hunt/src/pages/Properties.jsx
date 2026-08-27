import { useEffect, useState } from "react";
import { fetchProperties, fetchFavorites, addFavorite, deleteFavorite } from "../services/api";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"

function Properties(){
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [bedroomFilter, setBedroomFilter] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [favorites, setFavorites] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({
        page: 1, 
        per_page: 10,
        total: 0,
        pages: 0,
        has_next: false,
        has_prev: false
    });

    // Resetting to page 1 when filters apply
    useEffect(() => {
        setPage(1);
    }, [searchTerm, bedroomFilter, maxPrice, sortOption]);

    //Fetching from postgreSQL database
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        fetchProperties(
            page,10, searchTerm, bedroomFilter, maxPrice, sortOption
        )
        .then((data) => {
            setProperties(data.properties);
            setPagination(data.pagination);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
    }, [page, searchTerm, bedroomFilter, maxPrice, sortOption]);
    //Adding to favorites
    const toggleFavorite = async (propertyId) => {
    if (!user) {
        return "login required";
    }
    if (user.role !== "hunter") {
        return "hunter-only";
    }
    const existingFavorite = favorites.find(
        (favorite) => favorite.property_id === propertyId
    );
    try {
        if (existingFavorite) {
            await deleteFavorite(existingFavorite.id);
            setFavorites((currentFavorites) =>
                currentFavorites.filter(
                    (favorite) => favorite.id !== existingFavorite.id)
                );
            } 
        else {
            const newFavorite = await addFavorite(propertyId);
            setFavorites((currentFavorites) => [
                ...currentFavorites,newFavorite
            ]);
        }} 
    catch (error) {
        setError(error.message);
    }
};
    useEffect(() => {
        if (!user || user.role !== "hunter") {
            setFavorites([]);
            return;
        }

        fetchFavorites()
            .then((data) => {
                setFavorites(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [user]);
    
    return (
        <main className="properties-page">
            <h2>Available properties</h2>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <div className="filters-panel">
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
            </div>

            
            <p className="property-count">{pagination.total} properties found</p>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    {!user && (
                        <button onClick={() => navigate("/login")}>
                            Log In
                        </button>
                    )}
                </div>
            )}
            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.some(
                        (favorite) => favorite.property_id === property.id
                    )}
                    onToggleFavorite={toggleFavorite}
                    /> ))}
            </div>

            <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={!pagination.has_prev}>
                Previous
            </button>

            <span>
                Page {pagination.page} of {pagination.pages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination.has_next}
            >
                Next
            </button>
            </div>

        </main>
    );

}
export default Properties;