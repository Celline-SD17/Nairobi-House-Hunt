import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser, signup as signupUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirm_password: "",
        role: "hunter",
        email: "",
        phone: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({...currentData, [name]: value}));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            let user;
            if (isSignup) {
                const signupData = {
                    username: formData.username,
                    password: formData.password,
                    confirm_password: formData.confirm_password, 
                    role: formData.role
                };
                if (formData.role === "landlord"){
                    signupData.email = formData.email;
                    signupData.phone = formData.phone;
                }
                user = await signupUser(signupData);
            } 
            else {
                user = await loginUser({
                    username: formData.username,
                    password: formData.password
                });
            }
            login(user);
            if (user.role === "landlord") {
                navigate("/dashboard");
            } else {
                navigate("/properties");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const switchMode = () => {
        setIsSignup((currentMode) => !currentMode);
        setError("");
    };

    return (
        <main className="auth-page">
            <section className="auth-intro">
                <p className="auth-eyebrow">NAIROBI HOUSE HUNT</p>

                <h2>
                    {isSignup
                        ? "Make yourself at home."
                        : "Welcome back."}
                </h2>

                <p>
                    {isSignup
                        ? "Create your account and start finding your next home in Nairobi."
                        : "Sign in to continue your house-hunting journey."}
                </p>
            </section>

            <section className="auth-form-card">
                <div className="auth-form-heading">
                    <p className="section-label">
                        {isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
                    </p>

                    <h3>
                        {isSignup
                            ? "Tell us a little about yourself."
                            : "Good to see you again."}
                    </h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder={
                                isSignup
                                    ? "Choose a username"
                                    : "Enter your username"
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={
                                isSignup
                                    ? "Create a password"
                                    : "Enter your password"
                            }
                            required
                        />
                    </div>

                    {isSignup && (
                        <>
                            <div className="form-group">
                                <label htmlFor="confirm_password">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">
                                    Account Type
                                </label>

                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="hunter">
                                        House Hunter
                                    </option>

                                    <option value="landlord">
                                        Landlord
                                    </option>
                                </select>
                            </div>

                            {formData.role === "landlord" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. +254 712 345 678"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {error && (
                        <div className="auth-error">
                            <p>{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                    >
                        {isSignup ? "Create Account" : "Login"}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>
                        {isSignup
                            ? "Already have an account?"
                            : "Don't have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={switchMode}
                        className="auth-toggle"
                    >
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </div>
            </section>
        </main>
    );

}

export default Login;