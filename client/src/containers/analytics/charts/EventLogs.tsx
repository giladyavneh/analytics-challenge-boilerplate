import React, { useState, useEffect, useRef, useCallback } from "react";
import { EventLogsWrapper } from "../reusables/StyledComponents";
import { Event } from "../../../models/event";
import EventLog from "../reusables/EventLog";
import { Filter } from "../EventLogsTiles";


interface EventLogs {
  height: number;
  width: number;
  params:Filter;
  // fetchData:()=>void
}



const EventLogs: React.FC<EventLogs> = ({ height, width, params }) => {
  const [paramaters, setParamaters] = useState<Filter>(params);
  const [data, setData] = useState<{more:boolean,events:Event[]}>({more:true,events:[]});
  
  useEffect(() => {
    let query=Object.keys(paramaters).map((key)=>`${key}=${paramaters[key as keyof Filter]}`).join('&')
    fetch(`http://localhost:3001/events/all-filtered?${query}`)
    .then(res=>res.json())
    .then(res=>setData(res))
    // setData(data=>{
    //   let usedata=[...data.events]
    //   while (usedata.length<ammount){
    //     usedata=usedata.concat(mockGeo)
    //   }
    //   return {more:true,events:usedata}
    // });
  }, [paramaters]);

  const fetchData=():void=>{
    if (data.more) setParamaters(oldParms=>{
      let newParams={...oldParms}
      newParams.offset+=10
      return newParams
    })
  }

  return (
    <EventLogsWrapper width={width} height={height}>
      {data.events.map((event, index) =>
        data.events.length-1===index ? (
          <EventLog key={event._id} event={event} reffed={true} fetchData={()=>fetchData()}/>
        ) : (
          <EventLog key={event._id} event={event} reffed={false} fetchData={()=>fetchData()}/>
        )
      )}
    </EventLogsWrapper>
  );
};

export default EventLogs;
