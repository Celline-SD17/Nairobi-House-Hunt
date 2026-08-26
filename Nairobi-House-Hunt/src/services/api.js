const API_URL = import.meta.env.VITE_API_URL;
export async function fetchProperties(
    page = 1,
    perPage = 10,
    search = "",
    bedrooms = "",
    maxPrice = "",
    sort = ""
) {
    const params = new URLSearchParams({
        page,
        per_page: perPage
    });

    if (search) params.append("search", search);
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (maxPrice) params.append("max_price", maxPrice);
    if (sort) params.append("sort", sort);

    const response = await fetch(
        `${API_URL}/properties?${params.toString()}`
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch properties");
    }

    return data;
}

//Authentication
//Signup
export async function signup(userData) {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.error || JSON.stringify(data.errors) || "Signup failed"
        );
    }
    return data;
}

//Login
export async function login(userData) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }
    return data;
}

//Check Session
export async function checkSession() {
    const response = await fetch(`${API_URL}/check_session`, {
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        return null;
    }
    return data;
}

//Logout
export async function logout() {
    const response = await fetch(`${API_URL}/logout`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Logout failed");
    }
}

//Landlords viewing Properties
export async function fetchMyProperties() {
    const response = await fetch(`${API_URL}/my-properties`, {
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch your properties");
    }
    return data;
}

//Fetching favorites
export async function fetchFavorites() {
    const response = await fetch(`${API_URL}/favorites`, {
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch favorites");
    }
    return data;
}

//Adding properties to favorites
export async function addFavorite(propertyId, notes = "") {
    const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            property_id: propertyId,
            notes
        })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to add favorite");
    }
    return data;
}

//Updating notes on favorites
export async function updateFavorite(favoriteId, notes) {
    const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ notes })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to update favorite");
    }
    return data;
}

//Removing properties from favorites
export async function deleteFavorite(favoriteId) {
    const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete favorite");
    }
}

//Landlords adding properties to the database
export async function createProperty(propertyData) {
    const response = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(propertyData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.error || JSON.stringify(data.errors) || "Failed to create property"
        );
    }
    return data;
}

//Landlords updating their properties 
export async function updateProperty(propertyId, propertyData) {
    const response = await fetch(`${API_URL}/properties/${propertyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(propertyData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            data.error || JSON.stringify(data.errors) || "Failed to update property"
        );
    }
    return data;
}

//Landlords deleting their properties from the database
export async function deleteProperty(propertyId) {
    const response = await fetch(`${API_URL}/properties/${propertyId}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete property");
    }
}