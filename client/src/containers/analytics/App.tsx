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
import BrowsersPieTile from './BrowsersPieTile';
dotenv.config()


function AnalyticPage() {
  return (<>
  <h1>Analytics</h1>
    <div  style={{display:"flex", flexWrap:'wrap'}}>
      
      <SessionsByDayTile/>
      <SessionsByHoursTile/>
      <GeoLocationTile/>
      <RetentionTile/>
      <EventLogsTile/>
      <BrowsersPieTile/>
    </div>
    </>
  );
}

export default AnalyticPage;
