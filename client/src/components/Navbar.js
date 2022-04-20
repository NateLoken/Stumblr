import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/material';


export default function SimpleBottomNavigation() {
  return (
    <Box sx={{ width: 500 }}>
      <Paper sx={{ width: '100%', position: 'fixed', bottom: 10, left:0, right:0, zIndex:99}} elevation={15}>
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction Button component = { Link } to = "/find_bars" label="Map" icon={<MapOutlinedIcon />}/>
        <BottomNavigationAction Button component = { Link }to = "/sessions" label="Sessions" icon={<LiquorOutlinedIcon />} />
        <BottomNavigationAction Button component = { Link }to = "/login" label="Log in" icon={<AccountCircleOutlinedIcon/>} />
      </BottomNavigation>
      </Paper>
    </Box>
  );
}