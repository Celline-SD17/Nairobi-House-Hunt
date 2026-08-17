function PropertyCard({ property }){
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
            <a href={property.url} target="_blank" rel="noreferrer">
                View Listing
            </a>
        </article>
    );
}
export default PropertyCard;