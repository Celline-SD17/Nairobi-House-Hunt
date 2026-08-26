import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites"
import LandlordDashboard from "./pages/LandlordDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <>
            <header className="site-header">
                <h1 className="site-title">Nairobi House Hunt</h1>
                <Navbar />
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={
                    <ProtectedRoute role="hunter">
                    <Favorites />
                    </ProtectedRoute>
                    }
                />
                <Route path="/dashboard" element={
                    <ProtectedRoute role="landlord">
                        <LandlordDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

export default App;
