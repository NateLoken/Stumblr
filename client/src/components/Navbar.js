import * as React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context'

// This component displays the Navigation bar at the bottom of the page
export default function SimpleBottomNavigation() {
  // Instantiation of variables
  const userObject = useContext(userContext)
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0)

  /*
    logout doesn't take any parameters, it simply calls the logout function using the api and axios and then redirects the user back to the homepage
  */
  const logout = () => {
    axios
      .get('http://localhost:5000/logout', { withCredentials: true })
      .then((res) => {
        if (res.data === 'done') {
          navigate('/')
        }
      })
  }

  return (
    <Box sx={{ width: 500 }}>
      <Paper
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 3,
          left: 0,
          right: 0,
          zIndex: 99,
        }}
        elevation={15}
      >
        {/* Links to all the components in the application */}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            Button
            component={Link}
            to='/find_bars/'
            label='Map'
            icon={<MapOutlinedIcon />}
          />
          <BottomNavigationAction
            Button
            component={Link}
            to='/sessions/'
            label='Sessions'
            icon={<LiquorOutlinedIcon />}
          />
          {/* This small function uses the user context to determine if a user is logged in or not, if they are then the logout button is displayed and if not then the log in button is displayed */}
          {userObject ? (
            <BottomNavigationAction
              Button
              label='Log out'
              onClick={logout}
              icon={<AccountCircleOutlinedIcon />}
            />
          ) : (
            <BottomNavigationAction
              Button
              component={Link}
              to='/login'
              label='Log in'
              icon={<AccountCircleOutlinedIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
