import * as React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { userContext } from '../Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const userObject = React.useContext(userContext)
  let navigate = useNavigate()

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
          <Button variant='outlined'>Join Session</Button>
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
