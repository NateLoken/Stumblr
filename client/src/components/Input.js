import React, { useState } from 'react'
import axios from 'axios'
import { Alert, AlertTitle, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

// The input function finds another users session and join it
export default function Input() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  /*
    userSeach doesn't take any parameters, it uses the username state that is set by the TextField and creates a user object which is then used a search parameter for the api request
    if a user is found then the session id is returned and set into local storage and then the user is redirected to the sessions page. If not then an alert pops up telling the user
    that the person they were searching for wasn't found and the search string is reset
  */
  const userSearch = () => {
    const user = username

    if (user && user.length > 0) {
      axios
        .get(`/api/sessions/${user}`)
        .then((res) => {
          if (res.data) {
            window.localStorage.setItem('session_id', res.data)
            setUsername('')
            navigate('/sessions')
          } else {
            ;<Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              {username} not found
            </Alert>
            setUsername('')
          }
        })
        .catch((err) => console.log(err))
    } else {
      console.log('Input field required')
    }
  }

  // handleChange changes the value of the username which will be searched for when a user starts typing in the TextField
  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        id='outlined-username'
        label='Username'
        value={username}
        onChange={handleChange}
      />
      <br />
      <Button
        onClick={() => {
          userSearch()
        }}
        variant='contained'
      >
        Search user
      </Button>
    </Box>
  )
}
