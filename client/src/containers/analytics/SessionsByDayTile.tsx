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

type SessionsByDayTileProps= {
   date: string, count: number 
}[]
let mockLine=[
    {
      date: "24/10/2020",
      count: 12
    }, 
    {
      date: "25/10/2020",
      count: 43
    }, 
    {
      date: "26/10/2020",
      count: 7
    }, 
    {
      date: "27/10/2020",
      count: 12
    }, 
    {
      date: "28/10/2020",
      count: 43
    }, 
    {
      date: "29/10/2020",
      count: 7
    }, 
    {
      date: "30/10/2020",
      count: 78
    }, 
  ]
  
const SessionsByDayTile: React.FC = () => {
    const [data, setData]=useState<SessionsByDayTileProps>()
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
