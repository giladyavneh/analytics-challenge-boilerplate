import React, { useEffect, useState } from "react";
import { PieChart, Pie, LabelList, Cell } from "recharts";
import { httpClient } from "utils/asyncUtils";
import IntuitiveTile from "./reusables/IntuitiveTile";

const colors={
    chrome:"#ff0000",
    ie: "#001aac",
    firefox:"#ffd000",
    edge:"#00ff80",
    safari:"#00aeff",
    other:"#5a5a5a"
}

const BrowsersPieTile: React.FC = () => {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  useEffect(() => {
    httpClient.get("http://localhost:3001/events/browser").then((res) => setData(res.data));
  }, []);
  return (
    <IntuitiveTile tileName="Browsers Distribution" color="teal" loading={data.length === 0}>
      <PieChart width={400} height={400} margin={{top:5, bottom:5}}>
        <Pie data={data} dataKey="count" nameKey="name" fill="#00aeff" isAnimationActive={false} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.name as "chrome"|"ie"]||"#5a5a5a"} />
          ))}
          <LabelList dataKey="name" position="insideTop" clockWise={true} />
        </Pie>
      </PieChart>
    </IntuitiveTile>
  );
};

export default BrowsersPieTile;
