import { Link  } from "react-router-dom";
function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;