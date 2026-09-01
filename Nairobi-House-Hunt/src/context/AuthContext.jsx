import { createContext, useContext, useEffect, useState } from "react";
import { fetchMessages } from "../services/api";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const loadUnreadCount = async (currentUser) => { 
        try { 
            const messages = await fetchMessages(); 
            const unreadMessages = messages.filter( (message) => 
                message.receiver_id === currentUser.id && 
                !message.is_read ); 
                setUnreadCount(unreadMessages.length); 
        } catch (error) { 
                console.error( 
                    "Failed to load unread messages:",
                     error 
                ); 
                setUnreadCount(0); 
        } 
        };

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
            .then(async (data) => { 
                setUser(data); 
                await loadUnreadCount(data); 
            })
            .catch(() => {
                setUser(null);
                setUnreadCount(0);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async(userData) => {
        setUser(userData);
        await loadUnreadCount(userData);
    };

    const updateUser = (userData) => {
        setUser((currentUser) => ({
            ...currentUser,
            ...userData
        }));
    };

    const logout = () => {
        setUser(null);
        setUnreadCount(0);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                updateUser,
                logout, 
                unreadCount,
                setUnreadCount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}