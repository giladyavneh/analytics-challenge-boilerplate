import { type } from "os";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import IntuitiveTile from "./reusables/IntuitiveTile";
import {day} from "./reusables/IntuitiveTile";
import { httpClient } from "utils/asyncUtils";
import { AxiosResponse } from "axios";

export type SessionsByDayTileProps = {
  date: string;
  count: number;
}[];

const SessionsByDayTile: React.FC = () => {
  const [data, setData] = useState<SessionsByDayTileProps>([]);
  useEffect(() => {
    fetch("http://localhost:3001/events/by-days/0")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  function setWeekEnd(date:string):void{
    const now=Date.now()
    const weekEnd=new Date(date).getTime()
    const offset=Math.floor((now-weekEnd)/day)
    const saveData=[...data]
    setData([])
    httpClient.get(`http://localhost:3001/events/by-days/${offset}`)
    .then(res=>setData(res.data)).catch(err=>setData(saveData))
  }
  

  return (
    <IntuitiveTile
      color="teal"
      filters={{ weekEnd: "date"}}
      tileName="Traffic by days"
      loading={data.length === 0}
      filterFunctions={{weekEnd:setWeekEnd}}
    >
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
