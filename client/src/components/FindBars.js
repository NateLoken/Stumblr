import React from 'react'
import ListBars from './BarList'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

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
  height: '85vh',
  width: '100%',
}

const libraries = ['places']

function Map() {
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
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const [selected, setSelected] = React.useState(null)
  const [bars, setBars] = React.useState([])

  // To control the tabs
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const mapRef = React.useRef()
  const onLoad = React.useCallback((map) => {
    mapRef.current = map

    navigator.geolocation.getCurrentPosition((position) => {
      const localArea = new window.google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )

      mapRef.current.setCenter(localArea)

      const request = {
        location: localArea,
        radius: '10000',
        type: ['bar'],
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
  return (
    <Box sx={{ width: '100%' }}>
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
          {bars.map((item) => {
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
                <h2>{selected.name}</h2>
                <h2>{selected.rating}</h2>
                <h2>{selected.price_level}</h2>
                <button
                  onClick={() => {
                    addBar(selected.name, selected.location)
                  }}
                >
                  Add
                </button>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListBars bars={bars} />
      </TabPanel>
    </Box>
  )
}

export default React.memo(Map)
