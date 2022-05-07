import React, { useEffect } from 'react'
import axios from 'axios'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Stack,
  Slider,
  Tab,
  Tabs,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import SportsBar from '@mui/icons-material/SportsBar'
import { styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import mapStyles from './MapStyles'
import ListBars from './BarList'
const libraries = ['places', 'directions']

// TabPanel intantiates the tabs at the top to switch between the list and map view
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

// Options for the <GoogleMap> component 
const options = {
  disableDefaultUI: true,
  zoom: 13,
  clickableIcons: false,
  styles: mapStyles,
}

// How the container for the Map is rendered
const mapContainerStyle = {
  height: '100vh',
  width: '100%',
}

function Map() {
  // Instantiation of all the properties that the map and list views use
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
  /*
    The useEffect hook takes the place of the componentOnMount, componentOnUnmount, and componentDidUpate functions
    so by passing the hook without any variables to watch, it acts as the componentOnMount function and sets the session_id
    from a variable 'session_id' that is in local storage whenever the component is mounted
  */
  useEffect(() => {
    setSessionId(window.localStorage.getItem('session_id'))
  }, [])

  /*
    This useEffect hook acts as the componentDidUpate and whenever it senses a change in the state variable it updates the destination variable
  */
  useEffect(() => {
    if (state) {
      setDestination(state.location)
    }
  }, [state])

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

    // check to make sure the session id is valid
    if (session.id && session.id.length > 0) {
      // api request made through axios
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

  // The useJsApiLoader hook loads the appropriate scripts to be able to the google maps api, as the api is simply a 'Reactified' version of googles regular scripts which are ment for pure JavaScript
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

  // This callback is used to get directions to the destination and returns the directions, travel distance and duration
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

  /*
    The onLoad takes the 1 parameter:
      map: Google Map Instance
    This function is run whenever the map is updated, in it it finds the users location using the navigator functions provided by React.
    Then it sets the center of the map instance to the users location and builds a request to the google places api.
    The request is then sent to the places api and if it is successfull a list of bars is returned and the bars state is set to that list. 
  */
  const mapRef = React.useRef()
  const onLoad = React.useCallback((map) => {
    setMap(map)
    mapRef.current = map

    // Getting users current location
    navigator.geolocation.getCurrentPosition((position) => {
      const localArea = new window.google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )

      // set the map center and userLocation to be used by the directions service
      setUserLocation(localArea)
      originRef.current = localArea

      mapRef.current.setCenter(localArea)
      // request to be sent to the api
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

      // Google places api container
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      )

      // API call
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setBars(results)
        }
      })
    })
  }, [])

  // Show loading information for user and 'Map cannot be loaded right now' if the map is returns a loadError
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
  
  // Everything in the return are the html elements cotaining the map and list view
  return (
    <Box sx={{ width: '100%' }}>
      {/* This Stack Element contains the search and filtering functions */}
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
        {/* The <GoogleMap> component which actually creates the map on screen */}
        <GoogleMap
          options={options}
          mapContainerStyle={mapContainerStyle}
          onLoad={onLoad}
        >
        {/* A marker is created at the users current location */}
         <Marker
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scale: 7,
            }}
            position={userLocation}
          />
          {/* If the destination and origin (aka userLocation) aren't empty then the function that gets directions is called */}
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
          {/* If there are directions in the directionsResponse then it renders them using the DirectionsRenderer */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {/* This function filters through the bar list for bars matching the name, price, and rating and then maps through all the options and creates on the map for them */}
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

          {/* If a bar is selected then the info window is rendered onto the map as well */}
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
