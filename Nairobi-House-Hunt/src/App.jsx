import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup"


function App(){
  return(
    <>
    <header className="site-header">
      <h1 className="site-title">Nairobi House Hunt</h1>
      <Navbar />
    </header>

    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
