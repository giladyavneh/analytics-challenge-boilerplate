import React from 'react';

import IntuitiveTile from './reusables/IntuitiveTile';
import Map from "./charts/Map"
import dotenv from "dotenv"
import SessionsByDayTile from './SessionsByDayTile';
import GeoLocationTile from './GeoLocationTile';
import { Event } from "../../models/event";
import SessionsByHoursTile from './SessionsByHoursTile';
import Retention from './charts/Retention';
import RetentionTile from './RetentionTile';
import EventLog from './reusables/EventLog';
import EventLogs from './charts/EventLogs';
import EventLogsTile from './EventLogsTiles';
dotenv.config()


function AnalyticPage() {
  return (
    <div  style={{display:"flex", flexWrap:'wrap'}}>
      <h1>Analytics</h1>
      <SessionsByDayTile/>
      <SessionsByHoursTile/>
      <GeoLocationTile/>
      <RetentionTile/>
      <EventLogsTile/>
    </div>
  );
}

export default AnalyticPage;
