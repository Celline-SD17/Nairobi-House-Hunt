import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as logoutUser } from "../services/api";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            navigate("/login");
        } 
        catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>
                <Link to="/about">About</Link>
                {user?.role === "hunter" && (
                    <Link to="/favorites">Favorites</Link>
                )}
                {user?.role === "landlord" && (
                    <Link to="/dashboard">My Properties</Link>
                )}
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;