import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Session from "./components/Session";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import GoogleLoginComponent from "./components/GoogleButton";
import "./App.css";

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat:latitude, lng:longitude});
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/map" exact element={<Map />} />
            <Route path="/sessions" element={<Session />} />
            <Route path="/Login%20with%20Google" element={<GoogleLoginComponent />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
