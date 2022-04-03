import React from "react";
import Session from "./components/Session";
import FindBars from "./components/FindBars";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<FindBars />} />
          <Route path="/session" element={<Session />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
