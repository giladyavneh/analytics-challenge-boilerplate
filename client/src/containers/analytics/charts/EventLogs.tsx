import React, { useState, useEffect, useRef, useCallback } from "react";
import { EventLogsWrapper } from "../reusables/StyledComponents";
import { Event } from "../../../models/event";
import EventLog from "../reusables/EventLog";


interface EventLogs {
  height: number;
  width: number;
}

const EventLogs: React.FC<EventLogs> = ({ height, width }) => {
  const [ammount, setAmmount] = useState<number>(10);
  const [data, setData] = useState<{more:boolean,events:Event[]}>({more:true,events:[]});
  
  useEffect(() => {
    fetch(`http://localhost:3001/events/all-filtered?offset=${ammount}`)
    .then(res=>res.json())
    .then(res=>setData(res))
    // setData(data=>{
    //   let usedata=[...data.events]
    //   while (usedata.length<ammount){
    //     usedata=usedata.concat(mockGeo)
    //   }
    //   return {more:true,events:usedata}
    // });
  }, [ammount]);

  const fetchData=():void=>{
    if (data.more) setAmmount(ammount+10)
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
