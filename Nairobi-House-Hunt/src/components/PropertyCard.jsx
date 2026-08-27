
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PropertyCard({ property, isFavorite, onToggleFavorite }){
    const [favoriteError, setFavoriteError] = useState("");
    const navigate = useNavigate();
    const handleFavoriteClick = async () => {
        const result = await onToggleFavorite(property.id);
        if (result === "login required") {
            setFavoriteError("Please log in to add properties to your favorites.");
            setTimeout(() => {
                setFavoriteError("");
            }, 1500);
        }
        else if(result === "hunter-only"){

            setFavoriteError("Only house hunters can save favorites.");
            setTimeout(() => {
                setFavoriteError("");
            }, 1500);
        } else {
            setFavoriteError("");
        }
    }; 

    return (
        <article className="property-card"> 
            <h2>{property.title}</h2>
            <p className="property-price">{property.currency} {property.price.toLocaleString()}</p>
            <p>{property.location}</p>
            <p>{property.bedrooms} Bedrooms</p>
            {property.bathrooms !== null && (
                <p>{property.bathrooms} Bathrooms</p>
            )}
            <p>{property.property_type}</p>
            <Link to={`/properties/${property.id}`}>View Listing </Link>
            <button type="button" onClick={handleFavoriteClick}>
                {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
            {favoriteError && (
                <div className="favorite-error">
                    <p>{favoriteError}</p>
                    <button onClick={() => navigate("/login")}>
                        Log In
                    </button>
                </div>
            )}
        </article>
    );
}
export default PropertyCard;