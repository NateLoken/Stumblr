import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Session from "./components/Session";
import FindBars from "./components/FindBars";
import Navbar from "./components/Navbar";
import GoogleLoginComponent from "./components/GoogleButton";
import "./App.css";
export const UserContext = React.createContext({
  isLoggedIn: false,
  setLoggedIn: ()=>{},
  name: "",
  setName: ()=>{},
  email: "",
  setEmail: ()=>{},
  userId: "",
  setUserId: ()=>{}
});
const App = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  return (
      <Router>
        <div className="App">
          <UserContext.Provider value={{isLoggedIn, setLoggedIn, name, setName, email, setEmail, userId, setUserId}}>
            <Navbar />
            <Routes>
              <Route path="/find_bars" exact element={<FindBars />} />
              <Route path="/sessions" element={<Session />} />
              <Route path="/login" element={<GoogleLoginComponent />} />
            </Routes>
          </UserContext.Provider>
        </div>
      </Router>
  );
};

export default App;
