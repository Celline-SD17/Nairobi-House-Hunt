function PropertyCard({ property, isFavorite, onToggleFavorite }){
    return (
        <article className="property-card"> 
            <h2>{property.title}</h2>
            <p className="property-price">{property.currency} {property.price.toLocaleString()}</p>
            <p>{property.location}</p>
            <p>{property.bedrooms} Bedrooms</p>
            {property.bathrooms !== null && (
                <p>{property.bathrooms} Bathrooms</p>
            )}
            <p>{property.propertyType}</p>
            <a href={property.url} target="_blank" rel="noreferrer" className="view-listing">
                View Listing
            </a>
            <button onClick={() => onToggleFavorite(property.id)}>
                {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
        </article>
    );
}
export default PropertyCard;