import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    updateAccount,
    deleteAccount
} from "../services/api";

function Account() {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        password: "",
        confirm_password: "",
        email: user?.email || "",
        phone: user?.phone || ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setFormData({
            username: user?.username || "",
            password: "",
            confirm_password: "",
            email: user?.email || "",
            phone: user?.phone || ""
        });

        setMessage("");
        setError("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || "",
            password: "",
            confirm_password: "",
            email: user?.email || "",
            phone: user?.phone || ""
        });

        setMessage("");
        setError("");
        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        const accountData = {
            username: formData.username
        };

        if (user.role === "landlord") {
            accountData.email = formData.email || null;
            accountData.phone = formData.phone || null;
        }

        if (formData.password) {
            accountData.password = formData.password;
            accountData.confirm_password = formData.confirm_password;
        }

        try {
            const updatedUser = await updateAccount(accountData);

            updateUser(updatedUser);

            setFormData({
                username: updatedUser.username,
                password: "",
                confirm_password: "",
                email: updatedUser.email || "",
                phone: updatedUser.phone || ""
            });

            setMessage("Account updated successfully.");
            setIsEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setMessage("");
        setError("");

        try {
            await deleteAccount();

            logout();
            navigate("/");

        } catch (error) {
            setError(error.message);
            setDeleting(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <main className="account-page">
            <section className="account-container">
                <div className="account-header">
                    <p className="section-label">ACCOUNT</p>
                    <h2>My Account</h2>
                    <p>
                        View your account information and manage your
                        account settings.
                    </p>
                </div>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {!isEditing ? (
                    <>
                        <section className="account-details">
                            <div className="account-details-header">
                                <div>
                                    <p className="section-label">
                                        YOUR DETAILS
                                    </p>
                                    <h3>Account Information</h3>
                                </div>

                                <button
                                    type="button"
                                    className="edit-account-button"
                                    onClick={handleEdit}
                                >
                                    Edit Account
                                </button>
                            </div>

                            <div className="account-details-grid">
                                <div className="account-detail">
                                    <span>Username</span>
                                    <strong>{user.username}</strong>
                                </div>

                                <div className="account-detail">
                                    <span>Account Type</span>
                                    <strong>
                                        {user.role === "landlord"
                                            ? "Landlord"
                                            : "House Hunter"}
                                    </strong>
                                </div>

                                {user.role === "landlord" && (
                                    <>
                                        <div className="account-detail">
                                            <span>Email</span>
                                            <strong>
                                                {user.email || "Not provided"}
                                            </strong>
                                        </div>

                                        <div className="account-detail">
                                            <span>Phone</span>
                                            <strong>
                                                {user.phone || "Not provided"}
                                            </strong>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        <section className="account-danger-zone">
                            <div>
                                <p className="section-label">DANGER ZONE</p>
                                <h3>Delete Account</h3>
                                <p>
                                    Deleting your account is permanent and
                                    cannot be undone.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="delete-account-button"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Account"}
                            </button>
                        </section>
                    </>
                ) : (
                    <section className="account-edit-section">
                        <div className="account-details-header">
                            <div>
                                <p className="section-label">
                                    EDIT ACCOUNT
                                </p>
                                <h3>Update Your Details</h3>
                            </div>
                        </div>

                        <form
                            className="account-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="username">
                                    Username:
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {user.role === "landlord" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email:
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            Phone:
                                        </label>

                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="password">
                                    New Password:
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password">
                                    Confirm New Password:
                                </label>

                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <div className="account-form-actions">
                                <button type="submit">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="cancel-account-button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </section>
                )}
            </section>
        </main>
    );
}

export default Account;
