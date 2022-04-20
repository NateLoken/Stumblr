import * as React from 'react'
import { useContext } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import { myContext } from '../Context'
import axios from 'axios'
export default function SimpleBottomNavigation() {
  const userContext = useContext(myContext)
  const [value, setValue] = React.useState(0)

  const logout = () => {
    axios
      .get('http://localhost:5000/logout', { withCredentials: true })
      .then((res) => {
        if (res.data === 'done') {
          window.location.href = '/'
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
            to='/find_bars'
            label='Map'
            icon={<MapOutlinedIcon />}
          />
          <BottomNavigationAction
            Button
            component={Link}
            to='/sessions'
            label='Sessions'
            icon={<LiquorOutlinedIcon />}
          />
          {userContext ? (
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
