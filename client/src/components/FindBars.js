import React, { useEffect } from 'react'
import ListBars from './BarList'
import {
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from '@react-google-maps/api'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types'
import axios from 'axios'
import { Card, Button, CardContent, CardHeader, CircularProgress, Divider, CardActions, Alert } from '@mui/material'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import SportsBar from '@mui/icons-material/SportsBar';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
const libraries = ['places']

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
}

const mapStyles = {
  height: '100vh',
  width: '100%',
}

function Map() {
  const [selected, setSelected] = React.useState(null)
  const [bars, setBars] = React.useState([])
  const [session_id, setSessionId] = React.useState(null)
  const [searchName, setSearchName] = React.useState("");
  const [ratingRange, setRatingRange] = React.useState([1,5]);
  const [priceRange, setPriceRange] = React.useState([0, 4]);

  useEffect(() => {
    setSessionId(window.localStorage.getItem('session_id'))
  }, [])

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

  const handleDestinationChange = (e) => {
    setDestination(e.target.value)
  }

  async function calculateRoute() {
    if (destination === '') {
      console.log('test')
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: userLocation,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setDestination('')
  }

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
    if (!!searchName){
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
      <Stack spacing = {2} direction="row" sx={{mb:1}} alignItems="center">
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e)=>setSearchName(e.target.value) } />
        <Stack direction="column" alignItems="center">
          <Stack spacing ={0.5} direction="row" sx={{mb:1}} alignItems="center">
          <AttachMoneyRoundedIcon/>
          <PriceSlider 
          label="Price"
          value={priceRange} 
          onChange={(e)=>setPriceRange(e.target.value)} 
          step={1}
          marks
          min={1}
          max={4}
          disableSwap />
          <Stack spacing={-1.5} direction="row">
            <AttachMoneyRoundedIcon/>
            <AttachMoneyRoundedIcon/>
            <AttachMoneyRoundedIcon/>
          </Stack>
          </Stack>

          <Stack spacing ={0.5} direction="row" sx={{mb:1}} alignItems="center">
          <SportsBar/>
          <RatingSlider 
          label="Rating"
          value={ratingRange} 
          onChange={(e)=>setRatingRange(e.target.value)} 
          step={1}
          marks
          min={1}
          max={5}
          disableSwap />
          <Stack spacing={-1.5} direction="row">
            <SportsBar/>
            <SportsBar/>
            <SportsBar/>
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
        <GoogleMap
          options={options}
          mapContainerStyle={mapStyles}
          onLoad={onLoad}
        >
          {bars.filter((item)=>
          item.name.toLowerCase().includes(searchName.toLowerCase()) &&
          (item.price_level >= priceRange[0] &&
          item.price_level <= priceRange[1]) &&
          (item.rating >= ratingRange[0] &&
            item.rating <= ratingRange[1])
          )
          .map((item) => {
            return (
              <Marker
                key={item.place_id}
                position={item.geometry.location}
                onClick={() => setSelected(item)}
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
                  <CardHeader title={selected.name}  />
                  <Divider />
                  <CardContent>
                    Rating: {selected.rating}
                    <br />
                    Price Level: {selected.price_level}
                  </CardContent>
                  <CardActions>
                    <Button variant='outlined' onClick={() => addBar(session_id, selected.name, selected.geometry.location)}>Add</Button>
                  </CardActions>
                </Card>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListBars bars={bars} session_id={session_id} searchName={searchName} ratingRange = {ratingRange} priceRange={priceRange}/>
      </TabPanel>
    </Box>
  )
}

export default React.memo(Map)
