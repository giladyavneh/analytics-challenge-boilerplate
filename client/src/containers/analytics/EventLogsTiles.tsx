import React, { useEffect, useState } from "react";
import EventLogs from "./charts/EventLogs";
import IntuitiveTile from "./reusables/IntuitiveTile";
import {Event} from "../../models/event"

const EventLogsTile:React.FC=()=>{
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
    return(
        <IntuitiveTile color="teal" tileName="Events Log">
            <EventLogs width={800} height={400}/>
        </IntuitiveTile>
    )
}

export default EventLogsTile;