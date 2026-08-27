
import { useEffect, useState } from "react";
import {
    fetchMyProperties,
    createProperty,
    updateProperty,
    deleteProperty
} from "../services/api";

function LandlordDashboard() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const emptyForm = {
        title: "",
        price: "",
        currency: "KES",
        location: "",
        county: "Nairobi",
        city: "Nairobi",
        area: "",
        bedrooms: "",
        bathrooms: "",
        property_type: "Apartment",
        description: ""
    };

    const [formData, setFormData] = useState(emptyForm);

    const loadProperties = () => {
        fetchMyProperties()
            .then((data) => {
                setProperties(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadProperties();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const handleAddClick = () => {
        setError("");
        setEditingId(null);
        setFormData(emptyForm);
        setShowForm((currentValue) => !currentValue);
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setError("");

        const propertyData = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms)
        };

        try {
            await createProperty(propertyData);

            setFormData(emptyForm);
            setShowForm(false);
            loadProperties();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (property) => {
        setEditingId(property.id);
        setError("");

        setFormData({
            title: property.title || "",
            price: property.price || "",
            currency: property.currency || "KES",
            location: property.location || "",
            county: property.county || "Nairobi",
            city: property.city || "Nairobi",
            area: property.area || "",
            bedrooms: property.bedrooms || "",
            bathrooms: property.bathrooms || "",
            property_type: property.property_type || "Apartment",
            description: property.description || ""
        });
    };

    const handleUpdate = async (event, propertyId) => {
        event.preventDefault();
        setError("");

        const propertyData = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms)
        };

        try {
            await updateProperty(propertyId, propertyData);

            setEditingId(null);
            setFormData(emptyForm);
            loadProperties();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (propertyId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        try {
            await deleteProperty(propertyId);
            loadProperties();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading your properties...</p>;
    }

    return (
        <main className="landlord-dashboard">
            <h2>My Properties</h2>

            <button
                className="add-property-button"
                onClick={handleAddClick}
            >
                {showForm ? "Cancel" : "Add Property"}
            </button>

            {error && <p className="error-message">{error}</p>}

            {showForm && (
                <form
                    className="property-form"
                    onSubmit={handleCreate}
                >
                    <h3>Add Property</h3>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Monthly Rent</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Area</label>
                        <input
                            type="text"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            min="1"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <input
                            type="number"
                            id="bathrooms"
                            name="bathrooms"
                            min="1"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="property_type">
                            Property Type
                        </label>

                        <select
                            id="property_type"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                        >
                            <option value="Apartment">
                                Apartment
                            </option>
                            <option value="Condominium">
                                Condominium
                            </option>
                            <option value="Maisonette">
                                Maisonette
                            </option>
                            <option value="Townhouse">
                                Townhouse
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">
                        Create Property
                    </button>
                </form>
            )}

            {properties.length === 0 ? (
                <p>You haven't added any properties yet.</p>
            ) : (
                <div className="property-grid">
                    {properties.map((property) => (
                        <article
                            className="property-card"
                            key={property.id}
                        >
                            {editingId === property.id ? (
                                <form
                                    className="property-edit-form"
                                    onSubmit={(event) =>
                                        handleUpdate(
                                            event,
                                            property.id
                                        )
                                    }
                                >
                                    <h3>Edit Property</h3>

                                    <div className="form-group">
                                        <label htmlFor={`title-${property.id}`}>
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id={`title-${property.id}`}
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`price-${property.id}`}>
                                            Monthly Rent
                                        </label>
                                        <input
                                            type="number"
                                            id={`price-${property.id}`}
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`location-${property.id}`}>
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id={`location-${property.id}`}
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`area-${property.id}`}>
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            id={`area-${property.id}`}
                                            name="area"
                                            value={formData.area}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`bedrooms-${property.id}`}>
                                            Bedrooms
                                        </label>
                                        <input
                                            type="number"
                                            id={`bedrooms-${property.id}`}
                                            name="bedrooms"
                                            min="1"
                                            value={formData.bedrooms}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`bathrooms-${property.id}`}>
                                            Bathrooms
                                        </label>
                                        <input
                                            type="number"
                                            id={`bathrooms-${property.id}`}
                                            name="bathrooms"
                                            min="1"
                                            value={formData.bathrooms}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`property-type-${property.id}`}>
                                            Property Type
                                        </label>

                                        <select
                                            id={`property-type-${property.id}`}
                                            name="property_type"
                                            value={formData.property_type}
                                            onChange={handleChange}
                                        >
                                            <option value="Apartment">
                                                Apartment
                                            </option>
                                            <option value="Condominium">
                                                Condominium
                                            </option>
                                            <option value="Maisonette">
                                                Maisonette
                                            </option>
                                            <option value="Townhouse">
                                                Townhouse
                                            </option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`description-${property.id}`}>
                                            Description
                                        </label>

                                        <textarea
                                            id={`description-${property.id}`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="property-actions">
                                        <button type="submit">
                                            Update Property
                                        </button>

                                        <button
                                            type="button"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h3>{property.title}</h3>

                                    <p>
                                        {property.currency}{" "}
                                        {property.price.toLocaleString()}
                                    </p>

                                    <p>{property.location}</p>

                                    <p>
                                        {property.bedrooms} bedrooms ·{" "}
                                        {property.bathrooms} bathrooms
                                    </p>

                                    <p>{property.property_type}</p>

                                    <p>{property.description}</p>

                                    <div className="property-actions">
                                        <button
                                            onClick={() =>
                                                handleEdit(property)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    property.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default LandlordDashboard;
