import React, { useEffect, useState } from "react";

import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event, weeklyRetentionObject } from "../../models/event";
import Retention from "./charts/Retention";

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
  
const RetentionTile:React.FC = () => {
    const [data, setData]=useState<weeklyRetentionObject[]>([])
    useEffect(()=>{
        setData(mockRetention)
    },[])
    return (    
    <IntuitiveTile color="teal" tileName="Weekly Retention">
      <Retention height={800} width={400} data={data} />
    </IntuitiveTile>
  );
};

export default RetentionTile;