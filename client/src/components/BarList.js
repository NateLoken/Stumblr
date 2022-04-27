import axios from 'axios'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined'
import SportsBarIcon from '@mui/icons-material/SportsBar'
import { Alert, AlertTitle, Button, CardActions, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const StyledPricing = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'green',
  },
})

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#f28e46',
  },
})

function ListBars({ bars, session_id }) {
  function addBar(session_id, name, location) {
    const session = {
      id: session_id,
      bars: {
        name: name,
        location: location,
      },
    }

    if (session.id && session.id.length > 0) {
      axios
        .post('/api/sessions/bars', session)
        .then((res) => {
          if (res.status === 200) {
            <Alert severity='success'>
              <AlertTitle>Success</AlertTitle>
              {name} has been added to session
            </Alert>
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <ul>
      {bars && bars.length > 0 ? (
        bars.map((bars) => {
          return (
            <li key={bars.place_id}>
              <Card>
                <CardHeader
                  title={bars.name}
                  action={
                    <IconButton
                      color='primary'
                      onClick={() => {
                        addBar(session_id, bars.name, bars.geometry.location)
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent>
                  <Typography variant='body1' color='text.secondary'>
                    Rating: {bars.rating} ({bars.user_ratings_total})
                    <br />
                    <StyledRating
                      name='customized-color'
                      defaultValue={bars.rating}
                      readOnly
                      size='small'
                      precision={0.5}
                      max={5}
                      icon={<SportsBarIcon fontSize='inherit' />}
                      emptyIcon={<SportsBarOutlinedIcon fontSize='inherit' />}
                    />
                    <br />
                    Price level:
                    <br />
                    <StyledPricing
                      name='customized-color'
                      defaultValue={bars.price_level}
                      readOnly
                      size='small'
                      precision={0.5}
                      max={4}
                      icon={<AttachMoneyOutlinedIcon fontSize='inherit' />}
                      emptyIcon={<AttachMoneyOutlinedIcon fontSize='inherit' />}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </li>
          )
        })
      ) : (
        <li>No bars in area </li>
      )}
    </ul>
  )
}

export default React.memo(ListBars)
