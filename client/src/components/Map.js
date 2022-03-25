import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const options = {
  disableDefaultUI: true,
  zoom: 13
};

const mapStyles = {
  height: "100vh",
  width: "100%"
};

const defaultCenter = {
  lat: 32.316238,
  lng: -106.780449
};

function Map({setCoordinates, coordinates}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const renderMap = () => {
    return (
      <GoogleMap
        options={options}
        mapContainerStyle={mapStyles}
        center={coordinates}
      />
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry</div>;
  }

  return isLoaded ? renderMap() : <h2>Loading...</h2>;
}

export default React.memo(Map);
