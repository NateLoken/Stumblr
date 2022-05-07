import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Session from './components/Session'
import FindBars from './components/FindBars'
import Navbar from './components/Navbar'
import GoogleAuth from './components/Authentication'
import Homepage from './components/Homepage'
import Input from './components/Input'
import { userContext } from './Context'
import "./App.css";
const App = () => {
  // get userContext
  const userObject = useContext(userContext)
  return (
    /* The router handles the url routes and what routes are connected to which components */
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/find_bars' element={<FindBars />} />
          <Route path='/sessions' element={<Session />} />
          <Route path='/join_session' element={<Input />} />
          {/* This checks to make sure a user that is logged in already can't access the login page */}
          {userObject ? null : <Route path='/login' element={<GoogleAuth />} />}
        </Routes>
      </div>
    </Router>
  )
}

export default App
