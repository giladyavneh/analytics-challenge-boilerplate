import React, { useEffect, useState } from "react";

import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event, weeklyRetentionObject } from "../../models/event";
import Retention from "./charts/Retention";

  
const RetentionTile:React.FC = () => {
    const [data, setData]=useState<weeklyRetentionObject[]>([])
    const [loading, setLoading]=useState(true)
    useEffect(()=>{
        fetch(`http://localhost:3001/events/retention?dayZero=${new Date('10.10.2020').getTime()}`)
        .then(res=>res.json())
        .then(res=>{
          setData(res)
        })
    },[])
    // useEffect(()=>{setLoading(data.length===0)},[data])
    return (    
    <IntuitiveTile color="teal" tileName="Weekly Retention" loading={data.length===0}>
      {data.length}
      <Retention height={800} width={400} data={data} />
    </IntuitiveTile>
  );
};

export default RetentionTile;