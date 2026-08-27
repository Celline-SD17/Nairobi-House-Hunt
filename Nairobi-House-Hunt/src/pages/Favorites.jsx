
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    fetchFavorites,
    updateFavorite,
    deleteFavorite
} from "../services/api";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [notes, setNotes] = useState("");

    const loadFavorites = () => {
        fetchFavorites()
            .then((data) => {
                console.log("FAVORITES DATA:", data);
                setFavorites(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleEdit = (favorite) => {
        setEditingId(favorite.id);
        setNotes(favorite.notes || "");
    };

    const handleUpdate = async (favoriteId) => {
        try {
            const updatedFavorite = await updateFavorite(
                favoriteId,
                notes
            );

            setFavorites((currentFavorites) =>
                currentFavorites.map((favorite) =>
                    favorite.id === favoriteId
                        ? updatedFavorite
                        : favorite
                )
            );

            setEditingId(null);
            setNotes("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (favoriteId) => {
        const confirmed = window.confirm(
            "Remove this property from your favorites?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFavorite(favoriteId);

            setFavorites((currentFavorites) =>
                currentFavorites.filter(
                    (favorite) => favorite.id !== favoriteId
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading your favorites...</p>;
    }

    return (
        <main className="favorites-page">
            <div className="favorites-header">
                <p className="section-label">YOUR SHORTLIST</p>
                <h2>My Favorites.</h2>
                <p>
                Keep track of the homes you're considering and return to
                their full listings whenever you're ready.
                </p>
            </div>


            {error && <p className="error-message">{error}</p>}

            {favorites.length === 0 ? (
                <p>You haven't saved any properties yet.</p>
            ) : (
                <div className="property-grid">
                    {favorites.map((favorite) => (
                        <article
                            className="favorite-card"
                            key={favorite.id}
                        >
                            <h3>{favorite.property.title}</h3>

                            <p>
                                KES{" "}
                                {favorite.property.price.toLocaleString()}
                            </p>

                            <p>
                                {favorite.property.location}
                            </p>

                            <p>
                                {favorite.property.bedrooms} bedrooms ·{" "}
                                {favorite.property.bathrooms} bathrooms
                            </p>

                            <p>
                                {favorite.property.property_type}
                            </p>
                            <div className="property-actions">
                                <Link to={`/properties/${favorite.property.id}`}>
                                    View Listing
                                </Link>
                            </div>

                            {editingId === favorite.id ? (
                                <div className="favorite-notes">
                                    <label htmlFor={`notes-${favorite.id}`}>
                                        Notes
                                    </label>

                                    <textarea
                                        id={`notes-${favorite.id}`}
                                        value={notes}
                                        onChange={(event) =>
                                            setNotes(event.target.value)
                                        }
                                        placeholder="Add a note about this property"
                                    />

                                    <div className="property-actions">
                                        <button
                                            onClick={() =>
                                                handleUpdate(favorite.id)
                                            }
                                        >
                                            Save Notes
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setNotes("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>
                                        <strong>Notes:</strong>{" "}
                                        {favorite.notes || "No notes yet."}
                                    </p>

                                    <div className="property-actions">
                                        <button
                                            onClick={() =>
                                                handleEdit(favorite)
                                            }
                                        >
                                            Edit Notes
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(favorite.id)
                                            }
                                        >
                                            Remove
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

export default Favorites;
