import React from 'react'
import Button from '@mui/material/Button'
import '../App.css'
import GoogleIcon from '@mui/icons-material/Google'

// GoogleAuth handles the authentication to signup and login in with Google
function GoogleAuth() {
  /*
    googleLogin doesn't take any parameters, it simply calls the auth/google callback which is handled by the api to run 
    the google authentication
  */
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }
  return (
    <div
      style={{ view: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <h3>Login</h3>
      <Button
        variant='outlined'
        onClick={() => googleLogin()}
        startIcon={<GoogleIcon />}
      >
        Login with Google
      </Button>
    </div>
  )
}
export default GoogleAuth
