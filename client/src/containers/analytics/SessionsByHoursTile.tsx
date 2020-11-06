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

type SessionsByHourTileProps= {
   hour: string, count: number 
}[]
let mockLine=[
    {
        hour: "00:00",
        count: 12
      }, 
      {
        hour: "01:00",
        count: 43
      }, 
      {
        hour: "02:00",
        count: 7
      }, 
      {
        hour: "03:00",
        count: 78
      }, 
      {
        hour: "04:00",
        count: 12
      }, 
      {
        hour: "05:00",
        count: 43
      }, 
      {
        hour: "06:00",
        count: 7
      }, 
      {
        hour: "07:00",
        count: 78
      },    {
        hour: "08:00",
        count: 12
      }, 
      {
        hour: "09:00",
        count: 43
      }, 
      {
        hour: "10:00",
        count: 7
      }, 
      {
        hour: "11:00",
        count: 78
      }, 
      {
        hour: "12:00",
        count: 12
      }, 
      {
        hour: "13:00",
        count: 43
      }, 
      {
        hour: "14:00",
        count: 7
      }, 
      {
        hour: "15:00",
        count: 78
      },    {
        hour: "16:00",
        count: 12
      }, 
      {
        hour: "17:00",
        count: 43
      }, 
      {
        hour: "18:00",
        count: 7
      }, 
      {
        hour: "19:00",
        count: 78
      }, 
      {
        hour: "20:00",
        count: 12
      }, 
      {
        hour: "21:00",
        count: 43
      }, 
      {
        hour: "22:00",
        count: 7
      }, 
      {
        hour: "23:00",
        count: 54
      }
  ]
  
const SessionsByHoursTile: React.FC = () => {
    const [data, setData]=useState<SessionsByHourTileProps>()
    useEffect(()=>{
        setData(mockLine) 
    },[])
  return (
    <IntuitiveTile color="teal" tileName="Tile">
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