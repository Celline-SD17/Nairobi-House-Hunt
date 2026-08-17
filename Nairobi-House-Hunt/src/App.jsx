import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About"

function App(){
  return(
    <>
    <header>
      <h1>Nairobi House Hunt</h1>
      <Navbar />
    </header>

    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/about" element={<About />}/>
    </Routes>
    </>
  );
}

export default App;
