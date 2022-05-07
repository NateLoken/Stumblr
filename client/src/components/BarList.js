import axios from 'axios'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import {
  Alert,
  AlertTitle,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined'
import SportsBarIcon from '@mui/icons-material/SportsBar'
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

{/* The ListBars function is the counterpart to the google map view to see all the bars listed out in order of which bars are closest and match the filter criteria */}
function ListBars({ bars, session_id, searchName, ratingRange, priceRange }) {
  /*
    addBar takes 3 parameters:
      session_id: String,
      name: String,
      location: lat, lng object
    
    addBar uses the session_id, name, and location to build an object that will become the body of a post request to '/api/sessions/bars' in order
    to add the bar to the list of bars in the users session
  */
  function addBar(session_id, name, location) {
    const session = {
      id: session_id,
      bars: {
        name: name,
        location: location,
      },
    }

    // Check for valid session id
    if (session.id && session.id.length > 0) {
      // API request is made with axios
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
      {/* 
        This function filters through the bar list for bars matching the name, price, and rating and then maps through all the options and creates a card with rating and price information in the unordered list
        as well as a button which calls the addBar fuction to add the bar to the users session
      */}
      {bars && bars.length > 0 ? (
        bars
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchName.toLowerCase()) &&
              item.price_level >= priceRange[0] &&
              item.price_level <= priceRange[1] &&
              item.rating >= ratingRange[0] &&
              item.rating <= ratingRange[1]
          )
          .map((bars) => {
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
                        emptyIcon={
                          <AttachMoneyOutlinedIcon fontSize='inherit' />
                        }
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
