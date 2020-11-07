import { GoogleMap, LoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
import ClustererComponent from "@react-google-maps/api/dist/components/addons/MarkerClusterer";
import {Event} from "../../../models/event"
import React from "react";

interface mapProps {
    events:Event[],
    width:number,
    height:number
}


const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map: React.FC<mapProps> = ({events, width, height}) => {
    let locations=events.map(event=>event.geolocation.location)
    const containerStyle = {
        width: width+"px",
        height: height+"px",
      };
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={1}
        >
            <MarkerClusterer>
            {(clusterer) =>
            locations.map((location) => (
              <Marker key={location.lat*location.lng/(location.lat+location.lng)} position={location} clusterer={clusterer} />
            ))
          }
            </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
