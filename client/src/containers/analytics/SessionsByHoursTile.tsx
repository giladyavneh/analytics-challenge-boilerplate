import { type } from "os";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { httpClient } from "utils/asyncUtils";
import IntuitiveTile, { day } from "./reusables/IntuitiveTile";

export type SessionsByHourTileProps= {
   hour: string, count: number 
}[]

const SessionsByHoursTile: React.FC = () => {
    const [data, setData]=useState<SessionsByHourTileProps>([])
    
    useEffect(()=>{
      fetch('http://localhost:3001/events/by-hours/0')
      .then(res=>res.json())
      .then(res=>setData(res.reverse()))
    },[])

    function chooseDay(date:string):void{
      const now=Date.now()
    const weekEnd=new Date(date).getTime()
    const offset=Math.floor((now-weekEnd)/day)
    const saveData=[...data]
    setData([])
    httpClient.get(`http://localhost:3001/events/by-hours/${offset}`)
    .then(res=>setData(res.data.reverse())).catch(err=>setData(saveData))
    }

  return (
    <IntuitiveTile color="teal" tileName="Traffic by hour" loading={data.length===0} filters={{Day:"date"}} filterFunctions={{Day:chooseDay}}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </IntuitiveTile>
  );
};

export default SessionsByHoursTile;