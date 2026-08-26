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
            <main className="property-details">
                <h2>Login Required</h2>
                <p>
                    Please log in to view the full details of this property.
                </p>
                <button onClick={() => navigate("/login")}>
                    Log In
                </button>
                <button onClick={() => navigate(-1)}>
                    ← Back to Properties
                </button>
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
            <button onClick={() => navigate(-1)}>
                ← Back to Properties
            </button>
            <h2>{property.title}</h2>
            <p>
                <strong>Rent:</strong>{" "}
                {property.currency} {property.price.toLocaleString()}
            </p>
            <p>
                <strong>Location:</strong> {property.location}
            </p>
            <p>
                <strong>Area:</strong> {property.area}
            </p>
            <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
            <p>
                <strong>Property Type:</strong> {property.property_type}
            </p>
            <p>
                <strong>Description:</strong>
            </p>
            <p>{property.description}</p>
        </main>
    );
}

export default PropertyDetails;