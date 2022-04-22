import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import Session from './components/Session'
import FindBars from './components/FindBars'
import Navbar from './components/Navbar'
import GoogleAuth from './components/Authentication'
import Profile from './components/Profile'
import { myContext } from './Context'
import "./App.css";
const App = () => {
  const userObject = useContext(myContext)
  console.log(userObject)
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/find_bars' exact element={<FindBars />} />
          <Route path='/sessions' element={<Session />} />
          {userObject ? null : <Route path='/login' element={<GoogleAuth />} />}
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
