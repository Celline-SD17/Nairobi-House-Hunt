import { Link } from "react-router-dom";
function Signup(){
    return(
        <main className="auth-page">
            <h2>Create an Account</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Choose a username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                    type="password"
                    id="password"
                    name="pasword"
                    placeholder="Create a password: "
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input 
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </main>
    );
}

export default Signup;