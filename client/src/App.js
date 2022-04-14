import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Session from "./components/Session";
import FindBars from "./components/FindBars";
import Navbar from "./components/Navbar";
import GoogleLoginComponent from "./components/GoogleButton";
import "./App.css";

const App = () => {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/find_bars" exact element={<FindBars />} />
            <Route path="/sessions" element={<Session />} />
            <Route path="/login" element={<GoogleLoginComponent />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
