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


let mockGeo:Event[]=[
  {
    "_id": "4-OSZ9CUUQy",
    "session_id": "7bea9e9c-7022-4b38-b36f-43b316ac361a",
    "name": "signup",
    "distinct_user_id": "n9i5RjJ8a",
    "date": 1601990113053,
    "os": "android",
    "browser": "safari",
    "geolocation": {
      "location": {
        "lat": -60,
        "lng": 103
      },
      "accuracy": 1446
    },
    "url": "http://localhost3000/signup"
  },
  {
    "_id": "PeXMEptFWao",
    "session_id": "4cc054eb-a77e-4381-b6d9-158ea0ecd6c0",
    "name": "signup",
    "distinct_user_id": "ILMcLjORs9",
    "date": 1601717780742,
    "os": "linux",
    "browser": "ie",
    "geolocation": {
      "location": {
        "lat": 66,
        "lng": 129
      },
      "accuracy": 48
    },
    "url": "http://localhost3000/signup"
  },
  {
    "_id": "XXA15yu4goc",
    "session_id": "bf87680f-3e65-495c-90e8-091f95024287",
    "name": "signup",
    "distinct_user_id": "RZTx223nP2",
    "date": 1603699632302,
    "os": "other",
    "browser": "ie",
    "geolocation": {
      "location": {
        "lat": 35,
        "lng": 88
      },
      "accuracy": 26
    },
    "url": "http://localhost3000/signup"
  }
]

let mockRetention=[
    
  {
    "registrationWeek": 1,
    "newUsers": 7,
    "weeklyRetention": [
      100,
      86,
      86,
      86,
      57,
      0
    ],
    "start": "9/29/2020",
    "end": "10/6/2020"
  },
  {
    "registrationWeek": 2,
    "newUsers": 17,
    "weeklyRetention": [
      100,
      100,
      100,
      82,
      0
    ],
    "start": "10/6/2020",
    "end": "10/13/2020"
  },
  {
    "registrationWeek": 3,
    "newUsers": 9,
    "weeklyRetention": [
      100,
      100,
      78,
      0
    ],
    "start": "10/13/2020",
    "end": "10/20/2020"
  },
  {
    "registrationWeek": 4,
    "newUsers": 9,
    "weeklyRetention": [
      100,
      100,
      0
    ],
    "start": "10/20/2020",
    "end": "10/26/2020"
  },
  {
    "registrationWeek": 5,
    "newUsers": 8,
    "weeklyRetention": [
      100,
      0
    ],
    "start": "10/26/2020",
    "end": "11/2/2020"
  },
  {
    "registrationWeek": 6,
    "newUsers": 0,
    "weeklyRetention": [
      0
    ],
    "start": "11/2/2020",
    "end": "11/9/2020"
  }
]

function AnalyticPage() {
  return (
    <div  style={{display:"flex", flexWrap:'wrap'}}>
      <SessionsByDayTile/>
      <SessionsByHoursTile/>
      <GeoLocationTile data={mockGeo}/>
      <RetentionTile/>
      <EventLogsTile/>
    </div>
  );
}

export default AnalyticPage;
