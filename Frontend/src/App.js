import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home1 from "./Pages/Home1";
import Home2 from "./Pages/Home2";
import Home3 from "./Pages/Home3";
import Home4 from "./Pages/Home4";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />
        <Route path="/home4" element={<Home4 />} />
      </Routes>
    </Router>
  );
}

export default App;
