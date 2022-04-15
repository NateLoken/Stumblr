import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { UserContext } from '../App';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const user = React.useContext(UserContext);
  console.log("the value of user context object inside Navbar is ", user);
  if (user.isLoggedIn){
    return (
      <Box sx={{ width: 500 }}>
        <Paper sx={{ width: '100%', position: 'fixed', bottom: 3, left:0, right:0, zIndex:99}} elevation={15}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction Button component = { Link } to = "/find_bars" label="Map" icon={<MapOutlinedIcon />}/>
          <BottomNavigationAction Button component = { Link }to = "/sessions" label="Sessions" icon={<LiquorOutlinedIcon />} />
          <BottomNavigationAction Button component = { Link }to = "/login" label="Log Out" icon={<AccountCircleOutlinedIcon/>} />
        </BottomNavigation>
        </Paper>
      </Box>
    );
  }
  if (!user.isLoggedIn){
    return (
      <Box sx={{ width: 500 }}>
         <Paper sx={{ width: '100%', position: 'fixed', bottom: 3, left:0, right:0, zIndex:99}} elevation={15}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction Button component = { Link } to = "/find_bars" label="Map" icon={<MapOutlinedIcon />}/>
          <BottomNavigationAction Button component = { Link }to = "/sessions" label="Sessions" icon={<LiquorOutlinedIcon />} />
          <BottomNavigationAction Button component = { Link }to = "/login" label="Log In" icon={<AccountCircleOutlinedIcon/>} />
        </BottomNavigation>
        </Paper>
      </Box>
    );
  }
}