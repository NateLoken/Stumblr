import * as React from 'react'
import axios from 'axios'
import { Button, Box } from '@mui/material'
import { userContext } from '../Context'
import { useNavigate } from 'react-router-dom'

// Hompage displays the create session and join session buttons
export default function Homepage() {
  // Instantiation of vaiables
  const userObject = React.useContext(userContext)
  let navigate = useNavigate()

  /*
    createSession takes 1 parameter:
      username: String
    createSession takes the username and build a user object out of it which then becomes the body of an api request
    upon a successful post to the api the session id is returned, which is then put into local storage to be used by all the other components.
    After which the user is redirected to the map view to pick out bars for the session
  */
  const createSession = (username) => {
    const user = { owner: username }

    axios
      .post('api/sessions', user)
      .then((res) => {
        if (res.data)  {
          window.localStorage.setItem('session_id', res.data)
          navigate('/find_bars')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <h1>Stumblr</h1>
      <div>
        {/* The userContext is used to determine if a user is logged in or not, if they aren't then both buttons redirect the user to the login page */}
        {userObject ? (
          <Button
            variant='contained'
            onClick={() => {
              createSession(userObject.username)
            }}
          >
            Create Session
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              navigate('/login')
            }}
          >
            Create Session
          </Button>
        )}
      </div>
      <div>
        {userObject ? (
          <Button variant='outlined' onClick={() => {navigate('/join_session')}}>Join Session</Button>
        ) : (
          <Button
            variant='outlined'
            onClick={() => {
              navigate('/login')
            }}
          >
            Join Session
          </Button>
        )}
      </div>
    </Box>
  )
}
