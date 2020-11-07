import React, { useEffect, useState } from "react";
import {week} from "./reusables/IntuitiveTile";
import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event, weeklyRetentionObject } from "../../models/event";
import Retention from "./charts/Retention";

  
const RetentionTile:React.FC = () => {
    const [data, setData]=useState<weeklyRetentionObject[]>([])
    const [loading, setLoading]=useState(true)
    const [zeroDay, setZeroDay]= useState(Date.now()-week*5)
    useEffect(()=>{
        setData([])
        fetch(`http://localhost:3001/events/retention?dayZero=${zeroDay}`)
        .then(res=>res.json())
        .then(res=>{
          setData(res)
        })
    },[zeroDay])
    function setZero(date:string):void{
      setZeroDay(new Date(date).getTime())
    }
    return (    
    <IntuitiveTile color="teal" filters={{'Zero Day':'date'}} filterFunctions={{'Zero Day':setZero}} tileName="Weekly Retention" loading={data.length===0}>
      {data.length}
      <Retention height={800} width={400} data={data} />
    </IntuitiveTile>
  );
};

export default RetentionTile;