import React from "react";
import Session from "./components/Session";
import MapContainer from "./components/Map";
import "./App.css";


const App = () => {
  return (
	  <div className="App">
	  	<MapContainer />
		<Session />
	  </div>
  );
};

export default App;
