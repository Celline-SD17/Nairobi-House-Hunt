import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Properties />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
