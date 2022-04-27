import React from 'react'
import GoogleButton from 'react-google-button'

function GoogleAuth() {
  const googleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }
  return (
    <div
      style={{
        display: '-webkit-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h3>Login</h3>
      </div>
      <div>
        <GoogleButton
          type='light' // can be light or dark
          onClick={() => {
            googleLogin()
          }}
        />
      </div>
    </div>
  )
}
export default GoogleAuth
