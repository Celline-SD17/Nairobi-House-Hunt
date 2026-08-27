import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!user) {
            setLoading(false);
            return;
        }

        fetch(`${API_URL}/properties/${id}`, {
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch property");
                }

                return response.json();
            })
            .then((data) => {
                setProperty(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, user, authLoading]);

    if (authLoading) {
        return <p>Checking your session...</p>;
    }
    if (!user) {
        return (
            <main className="property-login-required">
                <h2>Login Required</h2>
                <p>
                    Please log in to view the full details of this property.
                </p>
                <div className="property-login-actions">
                    <button onClick={() => navigate("/login")}>
                        Log In
                    </button>
                    <button onClick={() => navigate(-1)}>
                        ← Back to Properties
                    </button>
                </div>
                
            </main>
        );
    }
    if (loading) {
        return <p>Loading property...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!property) {
        return <p>Property not found.</p>;
    }

        return (
            <main className="property-details">
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Properties
                </button>

                <div className="property-details-header">
                    <p className="property-details-eyebrow">
                        PROPERTY LISTING
                    </p>

                    <h2>{property.title}</h2>

                    <p className="property-details-price">
                        {property.currency}{" "}
                        {property.price.toLocaleString()}
                        <span>/ month</span>
                    </p>

                    <p className="property-details-location">
                        {property.location}
                    </p>
                </div>

                <div className="property-facts">
                    <div className="property-fact">
                        <span className="property-fact-label">
                            Area
                        </span>
                        <strong>{property.area}</strong>
                    </div>

                    <div className="property-fact">
                        <span className="property-fact-label">
                            Bedrooms
                        </span>
                        <strong>{property.bedrooms}</strong>
                    </div>

                    <div className="property-fact">
                        <span className="property-fact-label">
                            Bathrooms
                        </span>
                        <strong>{property.bathrooms}</strong>
                    </div>

                    <div className="property-fact">
                        <span className="property-fact-label">
                            Property Type
                        </span>
                        <strong>{property.property_type}</strong>
                    </div>
                </div>

                <section className="property-description">
                    <p className="property-section-label">
                        ABOUT THIS PROPERTY
                    </p>

                    <p>{property.description}</p>
                </section>

                {property.landlord && (
                    <section className="landlord-contact">
                        <p className="property-section-label landlord-section-label">
                            YOUR CONTACT
                        </p>

                        <h3>Contact Landlord</h3>

                        <p>
                            <strong>Name</strong>
                            <span>{property.landlord.username}</span>
                        </p>

                        <p>
                            <strong>Email</strong>
                            <a href={`mailto:${property.landlord.email}`}>
                                {property.landlord.email}
                            </a>
                        </p>

                        <p>
                            <strong>Phone</strong>
                            <a href={`tel:${property.landlord.phone}`}>
                                {property.landlord.phone}
                            </a>
                        </p>
                    </section>
                )}
            </main>
        );


            
}

export default PropertyDetails;