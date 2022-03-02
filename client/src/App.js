import React from "react";
import Session from "./components/Session";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/map" exact element={<Map/>} />
          <Route path="/sessions" element={<Session/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
