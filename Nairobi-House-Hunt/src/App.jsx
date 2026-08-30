import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites"
import LandlordDashboard from "./pages/LandlordDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyDetails from "./pages/PropertyDetails";
import Account from "./pages/Account";

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
                <Route path="/account"element={<Account />} />
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
                <Route path="/properties/:id" element={<PropertyDetails />} 
                />
            </Routes>
    </>
    );
};

export default App;
