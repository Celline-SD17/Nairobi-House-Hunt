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
        role: "hunter"
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
                user = await signupUser(formData);
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
            <h2>{isSignup ? "Create an Account" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
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
                    <label htmlFor="password">Password: </label>
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
                                Confirm Password:
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
                            <label htmlFor="role">Account Type: </label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option value="hunter">House Hunter</option>
                                <option value="landlord">Landlord</option>
                            </select>
                        </div>
                    </>
                )}
                {error && <p className="error-message">{error}</p>}
                <button type="submit"> {isSignup ? "Sign Up" : "Login"} </button>
            </form>
            <p>
                {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                <button type="button" onClick={switchMode} className="auth-toggle">
                    {isSignup ? "Login" : "Sign Up"}
                </button>
            </p>
        </main>
    );
}

export default Login;