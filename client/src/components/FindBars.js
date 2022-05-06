import React, { useEffect } from 'react'
import ListBars from './BarList'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import Slider from '@mui/material/Slider'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import SportsBar from '@mui/icons-material/SportsBar'
import { styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import mapStyles from './MapStyles'
const libraries = ['places', 'directions']

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const options = {
  disableDefaultUI: true,
  zoom: 13,
  clickableIcons: false,
  styles: mapStyles,
}

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
}

function Map() {
  const { state } = useLocation()
  const [selected, setSelected] = React.useState(null)
  const [bars, setBars] = React.useState([])
  const [session_id, setSessionId] = React.useState(null)
  const [map, setMap] = React.useState({})
  const [directionsResponse, setDirectionsResponse] = React.useState(null)
  const [distance, setDistance] = React.useState('')
  const [duration, setDuration] = React.useState('')
  const [destination, setDestination] = React.useState('')
  const [searchName, setSearchName] = React.useState('')
  const [ratingRange, setRatingRange] = React.useState([1, 5])
  const [priceRange, setPriceRange] = React.useState([0, 4])

  useEffect(() => {
    setSessionId(window.localStorage.getItem('session_id'))
  }, [])

  useEffect(() => {
    if (state) {
      setDestination(state.location)
    }
  }, [state])

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
          if (res.data) {
            ;<Alert onClick={() => {}}>{name} has been added to session</Alert>
          }
        })
        .catch((err) => console.log(err))
    }
  }
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const [userLocation, setUserLocation] = React.useState(
    /** @type google.maps.Map */ (null)
  )

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = React.useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  // const destinationRef = React.useRef()

  const directionsCallback = React.useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response)
        setDuration(response.routes[0].legs[0].duration.text)
        setDistance(response.routes[0].legs[0].distance.text)
      }
    } else {
      console.log('response: ', response)
    }
  })

  // To control the tabs
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const mapRef = React.useRef()
  const onLoad = React.useCallback((map) => {
    setMap(map)
    mapRef.current = map

    navigator.geolocation.getCurrentPosition((position) => {
      const localArea = new window.google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )

      setUserLocation(localArea)
      originRef.current = localArea

      mapRef.current.setCenter(localArea)
      const request = {
        location: localArea,
        radius: '10000',
        type: ['bar'],
      }
      if (!!searchName) {
        const request = {
          location: localArea,
          radius: '10000',
          type: ['bar'],
          keyword: searchName,
        }
      }

      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      )

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setBars(results)
        }
      })
    })
  }, [])

  if (loadError) return <div>Map cannot be loaded right now, sorry</div>
  if (!isLoaded) return <CircularProgress />
  const PriceSlider = styled(Slider)({
    color: '#52af77',
    width: 150,
  })
  const RatingSlider = styled(Slider)({
    color: '#f28e46',
    width: 150,
  })
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Stack direction='column' alignItems='center'>
          <Stack
            spacing={0.5}
            direction='row'
            sx={{ mb: 1 }}
            alignItems='center'
          >
            <AttachMoneyRoundedIcon />
            <PriceSlider
              label='Price'
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              step={1}
              marks
              min={1}
              max={4}
              disableSwap
            />
            <Stack spacing={-1.5} direction='row'>
              <AttachMoneyRoundedIcon />
              <AttachMoneyRoundedIcon />
              <AttachMoneyRoundedIcon />
            </Stack>
          </Stack>

          <Stack
            spacing={0.5}
            direction='row'
            sx={{ mb: 1 }}
            alignItems='center'
          >
            <SportsBar />
            <RatingSlider
              label='Rating'
              value={ratingRange}
              onChange={(e) => setRatingRange(e.target.value)}
              step={1}
              marks
              min={1}
              max={5}
              disableSwap
            />
            <Stack spacing={-1.5} direction='row'>
              <SportsBar />
              <SportsBar />
              <SportsBar />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Map' {...a11yProps(0)} />
          <Tab label='List' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Distance: {distance} <br></br>
        Duration: {duration}
        <GoogleMap
          options={options}
          mapContainerStyle={mapContainerStyle}
          onLoad={onLoad}
        >
         <Marker
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scale: 7,
            }}
            position={userLocation}
          />
          {destination !== '' && userLocation !== '' && (
            <DirectionsService
              options={{
                origin: userLocation,
                destination: destination,
                travelMode: 'DRIVING',
              }}
              callback={directionsCallback}
            />
          )}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {bars
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchName.toLowerCase()) &&
                item.price_level >= priceRange[0] &&
                item.price_level <= priceRange[1] &&
                item.rating >= ratingRange[0] &&
                item.rating <= ratingRange[1]
            )
            .map((item) => {
              return (
                <Marker
                  key={item.place_id}
                  position={item.geometry.location}
                  onClick={() => {
                    setSelected(item)
                    setDestination(item.geometry.location)
                    {
                      destination !== '' && userLocation !== '' && (
                        <DirectionsService
                          options={{
                            origin: userLocation,
                            destination: destination,
                            travelMode: 'DRIVING',
                          }}
                          callback={directionsCallback}
                        />
                      )
                    }
                  }}
                />
              )
            })}

          {selected ? (
            <InfoWindow
              position={selected.geometry.location}
              onCloseClick={() => {
                setSelected(null)
              }}
            >
              <div>
                <Card>
                  <CardHeader title={selected.name} />
                  <Divider />
                  <CardContent>
                    Rating: {selected.rating}
                    <br />
                    Price Level: {selected.price_level}
                  </CardContent>
                  <CardActions>
                    <Button
                      variant='outlined'
                      onClick={() =>
                        addBar(
                          session_id,
                          selected.name,
                          selected.geometry.location
                        )
                      }
                    >
                      Add
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListBars
          bars={bars}
          session_id={session_id}
          searchName={searchName}
          ratingRange={ratingRange}
          priceRange={priceRange}
        />
      </TabPanel>
    </Box>
  )
}

export default React.memo(Map);
