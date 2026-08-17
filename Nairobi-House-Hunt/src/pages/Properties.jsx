import { useEffect, useState } from "react";
import { fetchProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Properties(){
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
    if (loading) {
        return <p>Loading Properties...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <div>
            <h1>Nairobi House Hunt</h1>
            <p>{properties.length} properties found</p>
            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                    ))}
            </div>

        </div>
    );

}
export default Properties;