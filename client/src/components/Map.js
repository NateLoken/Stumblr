import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const options = {
  disableDefaultUI: true,
  zoom: 13,
};

const mapStyles = {
  height: "100vh",
  width: "100%",
};

const libraries = ["places"];

const bars = [];

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onLoad = React.useCallback(
    (map) => {
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
            for (var i = 0; i < results.length; i++) {
              const marker = new window.google.maps.Marker({
                position: results[i].geometry.location,
                map: mapRef.current,
                key: results[i].place_id,
              });
            }
          }
        });
      });
    },
    []
  );

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap options={options} mapContainerStyle={mapStyles} onLoad={onLoad}>
      {}
    </GoogleMap>
  );
}

export default React.memo(Map);
