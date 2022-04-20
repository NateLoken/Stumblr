import { borders } from '@mui/system'
import React from 'react'
import GoogleButton from 'react-google-button'

function GoogleAuth() {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }
  return (
    <div
      style={{ view: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <h3>Login</h3>
      <GoogleButton
        type='light' // can be light or dark
        onClick={() => {
          googleLogin()
        }}
      />
    </div>
  )
}
export default GoogleAuth
