import axios from 'axios'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Rating from '@mui/material/Rating'
import { Button } from '@mui/material'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

function ListBars({ bars }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


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
                  <Typography variant='body2' color='text.secondary'>
                    Rating: {bars.rating} ({bars.user_ratings_total})
                    <br />
                    <Rating
                      text-align='right'
                      name='read-only'
                      size='small'
                      precision={0.5}
                      value={bars.rating}
                      readOnly
                    />
                    <br />
                    Price level: {bars.price_level}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      Additional info can be put here
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </li>
          )
        })
      ) : (
        <li>No bars in area</li>
      )}
    </ul>
  )
}

export default React.memo(ListBars)
