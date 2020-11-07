import React, { useEffect, useState } from "react";
import Map from "./charts/Map";
import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event } from "../../models/event";
interface GeoLoactionTileProps {
  
}

const GeoLocationTile: React.FC<GeoLoactionTileProps> = () => {
  const [data, setData]=useState<Event[]>([])
  useEffect(()=>{
    fetch('http://localhost:3001/events/all')
    .then(res=>res.json())
    .then(res=>setData(res))
  },[])
  return (
    <IntuitiveTile color="teal" tileName="Event's Locations" loading={data.length===0}>
      <Map height={800} width={400} events={data} />
    </IntuitiveTile>
  );
};

export default GeoLocationTile;