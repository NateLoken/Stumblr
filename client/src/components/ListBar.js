// Displays bars in list format for a session
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material'
import React from 'react'
import NavigationIcon from '@mui/icons-material/Navigation'
import { useNavigate } from 'react-router-dom'

/* ListBars lists all the bars that are in the users session */
function ListBars({ session, deleteBar }) {
  let navigate = useNavigate()

  /*
    routeChange takes 1 parameter:
      barLocation: lat, lng object
    routeChange redirects the user to the map while changing the state within the global location variable to the barLocation object
  */
  const routeChange = (barLocation) => {
    navigate('/find_bars', {
      state: {
        location: barLocation,
      },
    })
  }

  /*
    This function maps through the session and to create a list of all the bars in the session
  */
  return session.map((session) => {
    return (
      <ul key={session._id}>
        <Stack
          direction='column'
          justifyContent='center'
          spacing={2}
          divider={<Divider orientation='horizontal' flexItem />}
        >
          {/* 
            This map function creates the individual cards to display bar name as well a button to remove the bar from the session
            as well as a button to that calls the routeChange function to get directions to the bar 
          */}
          {session.bars.map((bars) => (
            <Card key={bars._id}>
              <CardHeader
                title={bars.name}
                action={
                  <Button
                    color='error'
                    size='large'
                    onClick={() => {
                      deleteBar(bars._id)
                    }}
                  >
                    Remove
                  </Button>
                }
              />
              <CardActions>
                <Button
                  variant='contained'
                  startIcon={<NavigationIcon />}
                  onClick={() => {
                    routeChange(bars.location)
                  }}
                >
                  Get Directions
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </ul>
    )
  })
}

export default ListBars
