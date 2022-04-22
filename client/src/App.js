import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Session from './components/Session'
import FindBars from './components/FindBars'
import Navbar from './components/Navbar'
import GoogleAuth from './components/Authentication'
import Homepage from './components/Homepage'
import { userContext } from './Context'
import "./App.css";
const App = () => {
  const userObject = useContext(userContext)
  console.log(userObject)
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/find_bars' element={<FindBars />} />
          <Route path='/sessions' element={<Session />} />
          {userObject ? null : <Route path='/login' element={<GoogleAuth />} />}
        </Routes>
      </div>
    </Router>
  )
}

export default App
