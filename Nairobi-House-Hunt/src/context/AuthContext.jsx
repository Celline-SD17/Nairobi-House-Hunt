import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/check_session`, {
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Not authenticated");
                }

                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const updateUser = (userData) => {
        setUser((currentUser) => ({
            ...currentUser,
            ...userData
        }));
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                updateUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}