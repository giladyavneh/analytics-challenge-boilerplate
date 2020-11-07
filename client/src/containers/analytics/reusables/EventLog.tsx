import React, { useCallback, useRef, useState } from "react";
import { Event } from "../../../models/event";
import { EventLogContainer, EventLogHeader, EventTable, UserMarker } from "./StyledComponents";

type fetchData= ()=>void

interface EventLogProps{event:Event, reffed:boolean, fetchData:fetchData}

const EventLog:React.FC<EventLogProps>=({event, reffed, fetchData})=>{
    const [open, setOpen]=useState<boolean>(false)
    // const [load, setLoad]= useState<boolean>(true)
    
    const observer = useRef<IntersectionObserver|null>(null);
    const lastLog = useCallback((node) => {
      if (observer.current as IntersectionObserver) observer.current?.disconnect()
    observer.current= new IntersectionObserver(enteries=>{
      if (enteries[0].isIntersecting){
        // console.log('v')
        // setLoad(false)
        fetchData()
      }
    })
    if (node) observer.current?.observe(node)
  }, []);
    
    return (
        <EventLogContainer open={open} ref={reffed?lastLog:null}>
            <EventLogHeader>
                <UserMarker/>
                <div>{event.distinct_user_id}</div>
                <div>{event.name}</div>
                <div style={{cursor:"pointer"}} onClick={()=>setOpen(open=>!open)}>^</div>
            </EventLogHeader>
            <EventTable>
    {Object.keys(event).map(key=><div key={key+event._id} style={{padding:'5px'}}><b>{key}</b>: {JSON.stringify(event[key as keyof Event])}</div>)}
            </EventTable>
        </EventLogContainer>
    )
}

export default EventLog;