import { useEffect, useState } from "react";
import { fetchProperties } from "../services/api";

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
            {properties.map((property) => (
                <div key={property.id}>
                    <h2>{property.title}</h2>
                    <p>{property.location}</p>
                    <p>{property.currency} {property.price}</p>
                    <p>{property.bedrooms} bedrooms</p>
                </div>
            ))}
        </div>
    );

}
export default Properties;