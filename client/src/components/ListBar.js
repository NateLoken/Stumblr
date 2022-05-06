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
// import zIndex from '@mui/material/styles/zIndex'

function ListBars({ session, deleteBar }) {
  let navigate = useNavigate()
  const routeChange = (barLocation) => {
    navigate('/find_bars', {
      state: {
        location: barLocation,
      },
    })
  }

  return session.map((session) => {
    return (
      <ul key={session._id}>
        <Stack
          direction='column'
          justifyContent='center'
          spacing={2}
          divider={<Divider orientation='horizontal' flexItem />}
        >
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
