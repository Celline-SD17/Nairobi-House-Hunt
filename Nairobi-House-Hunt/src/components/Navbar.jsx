import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as logoutUser } from "../services/api";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            setShowAccountMenu(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleAccountClick = () => {
        setShowAccountMenu((current) => !current);
    };

    const handleEditAccount = () => {
        setShowAccountMenu(false);
        navigate("/account");
    };

    const handleDeleteAccount = () => {
        setShowAccountMenu(false);
        navigate("/account");
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
                    <div className="account-menu">
                        <button
                            type="button"
                            className="account-button"
                            onClick={handleAccountClick}
                        >
                            Account ▾
                        </button>

                        {showAccountMenu && (
                            <div className="account-dropdown">
                                <button
                                    type="button"
                                    onClick={handleEditAccount}
                                >
                                    Edit Account
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Account
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

