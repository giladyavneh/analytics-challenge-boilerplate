import React from "react";
import Map from "./charts/Map";
import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event } from "../../models/event";
interface GeoLoactionTileProps {
  data: Event[];
}

const GeoLocationTile: React.FC<GeoLoactionTileProps> = ({ data }) => {
  return (
    <IntuitiveTile color="teal" tileName="Tile">
      <Map height={800} width={400} events={data} />
    </IntuitiveTile>
  );
};

export default GeoLocationTile;