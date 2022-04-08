import React, { Component } from 'react'
import './Authentication.css'
import Button from '@mui/material/Button'
import GoogleButton from 'react-google-button'

class auth extends Component {
  render() {
    return (
      <form action='http://localhost:5000/auth/google'>
        <button type='submit' className='google-button'>
          <GoogleButton
            type='light' // can be light or dark
            onClick={() => {
              console.log('Google button clicked')
            }}
          />
        </button>
      </form>
    )
  }
}
export default auth

// export default function BasicButtons() {
//   return (
//       <Button variant="Sign in with Google">Outlined</Button>
//   );
// }
