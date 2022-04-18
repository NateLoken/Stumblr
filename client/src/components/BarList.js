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
import { Button } from '@mui/material'

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

function ListBars({ bars }) {
  function addBar(name, location) {
    const session = {
      id: '62509d7a53c7195026dd2f8c',
      bars: {
        name: name,
        location: location,
      },
    }

    if (session.id && session.id.length > 0) {
      axios
        .post('/api/sessions/bars', session)
        .then((res) => {
          if (res.data) {
            console.log('success')
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
                    <Button
                      variant='outlined'
                      onClick={() => {
                        addBar(bars.name, bars.geometry.location)
                      }}
                    >
                      Add
                    </Button>
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
