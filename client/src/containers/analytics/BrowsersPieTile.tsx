import React, { useEffect, useState } from "react";
import PieChart from "./charts/PieChart";
import { httpClient } from "utils/asyncUtils";
import IntuitiveTile from "./reusables/IntuitiveTile";

const BrowsersPieTile:React.FC=()=>{
    const [data,setData]=useState<{name:string,count:number}[]>([])
    useEffect(()=>{
        httpClient.get('http://localhost:3001/events/browser')
        .then(res=>setData(res.data))
    },[])
    return (
        <IntuitiveTile tileName="Browsers Distribution" color="teal" loading={data.length===0}>
            <PieChart width={400} height={400} data={data}/>
        </IntuitiveTile>
    )
}

export default BrowsersPieTile;