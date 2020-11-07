import React, { useEffect, useState } from "react";
import EventLogs from "./charts/EventLogs";
import IntuitiveTile from "./reusables/IntuitiveTile";
import { Event } from "../../models/event";

export interface Filter {
  sorting?: string;
  type?: string;
  browser?: string;
  search?: string;
  offset: number;
}

const EventLogsTile: React.FC = () => {
  // const [ammount, setAmmount] = useState<number>(10);
  const [data, setData] = useState<{ more: boolean; events: Event[] }>({ more: true, events: [] });
  const [params, setParams]=useState<Filter>({offset:10})
  useEffect(() => {
    let query=Object.keys(params).map((key)=>`${key}=${params[key as keyof Filter]}`).join('&')
    fetch(`http://localhost:3001/events/all-filtered?${query}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [ params]);

  // const fetchData = (): void => {
  //   setData({more:true,events:[]})
  //   if (data.more) setParams(oldParms=>{
  //     let newParams={...oldParms}
  //     newParams.offset+=10
  //     return newParams
  //   })
  // };

function setRegex(search:string):void{
  setData({more:true,events:[]})
  setParams(oldParms=>{
    let newParams={...oldParms}
    newParams.search=search
    newParams.offset=10
    return newParams
  })
}

function setBrowser(browser:string):void{
  setData({more:true,events:[]})
  setParams(oldParms=>{
    let newParams={...oldParms}
    newParams.browser=browser
    newParams.offset=10
    return newParams
  })
}

function setType(type:string):void{
  setData({more:true,events:[]})
  setParams(oldParms=>{
    let newParams={...oldParms}
    newParams.type=type
    newParams.offset=10
    return newParams
  })
}

  return (
    <IntuitiveTile
      color="teal"
      tileName="Events Log"
      filters={{ "Key Word": "search", Browser: "browser", Event: "type" }}
      filterFunctions={{"Key Word":setRegex, Browser:setBrowser, Event:setType }}
      loading={data.events.length === 0}
    >
      <EventLogs width={800} height={400} params={params}/>
    </IntuitiveTile>
  );
};

export default EventLogsTile;
