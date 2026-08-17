import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
