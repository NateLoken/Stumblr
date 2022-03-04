import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Session from "./components/Session";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/map" exact element={<Map />} />
            <Route path="/sessions" element={<Session />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
