import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Session from "./components/Session";
import FindBars from "./components/FindBars";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication";
import { myContext } from './Context'
import "./App.css";
const App = () => {
  const userObject = useContext(myContext)
  console.log(userObject)
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
