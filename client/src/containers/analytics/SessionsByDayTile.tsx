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
import IntuitiveTile from "./reusables/IntuitiveTile";

export type SessionsByDayTileProps= {
   date: string, count: number 
}[]

  
const SessionsByDayTile: React.FC = () => {
    const [data, setData]=useState<SessionsByDayTileProps>([])
    useEffect(()=>{
      fetch('http://localhost:3001/events/by-days/7')
      .then(res=>res.json())
      .then(res=>setData(res))
        
    },[])
  return (
    <IntuitiveTile color="teal" filters={{weekEnd:"date", 'Key Word':"search", Event:"type", Browser:"browser"}} tileName="Traffic by days" loading={data.length===0}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </IntuitiveTile>
  );
};

export default SessionsByDayTile;
