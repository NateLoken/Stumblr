import React, { useState, useEffect } from "react";
import Session from "./components/Session";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat:latitude, lng:longitude});
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Map
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          />} />
          <Route path="/session" element={<Session/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
