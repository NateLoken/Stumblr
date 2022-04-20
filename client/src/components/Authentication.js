import { borders } from '@mui/system'
import React from 'react'
import Button from '@mui/material/Button';
import "../App.css";
import GoogleIcon from '@mui/icons-material/Google';


function GoogleAuth() {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }
  return (
    <div
      style={{ view: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h3>Login</h3>
        {/* <button type="submit" className="google-button"> </button> */}
          <Button variant="outlined" onClick={() => googleLogin()} startIcon={<GoogleIcon />}>Login with Google</Button>
    </div>
  )
}
export default GoogleAuth
