import React from "react";
import ListBars from "./BarList";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const options = {
  disableDefaultUI: true,
  zoom: 13,
};

const mapStyles = {
  height: "100vh",
  width: "100%",
};

const libraries = ["places"];

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = React.useState(null);
  const [bars, setBars] = React.useState([]);

  const mapRef = React.useRef();
  const onLoad = React.useCallback((map) => {
    mapRef.current = map;

    navigator.geolocation.getCurrentPosition((position) => {
      const localArea = new window.google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      mapRef.current.setCenter(localArea);

      const request = {
        location: localArea,
        radius: "5000",
        type: ["bar"],
      };

      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setBars(results);
        }
      });
    });
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
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
          );
        })}

        {selected ? (
          <InfoWindow
            position={selected.geometry.location}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
              <h2>{selected.rating}</h2>
              <h2>{selected.price_level}</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <ListBars bars={bars} />
    </div>
  );
}

export default React.memo(Map);
