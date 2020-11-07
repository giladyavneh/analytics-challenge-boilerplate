import React, { useEffect } from "react";
import { weeklyRetentionObject } from "../../../models/event";
import {
  GrayTile,
  PrecentageTile,
  RetentionWrapper
} from "../reusables/StyledComponents";

interface RetentionProps {
  data: weeklyRetentionObject[];
  height:number;
  width:number
}


const Retention: React.FC<RetentionProps> = ({ data, height, width }) => {
  return (
    <RetentionWrapper height={height} width={width} maxWeeks={data.length + 1}>
      <div></div>
      {data.map((week) => (
        <GrayTile>{"Week " + week.registrationWeek}</GrayTile>
      ))}
      {(() => {
        let tiles: JSX.Element[] = [];
        for (let i = 0; i < data.length; i++) {
          tiles.push(<GrayTile>
              {"Week " + data[i].registrationWeek} <br/>
              <span style={{fontSize:12,color:'gray'}}>{`${data[i].start}-${data[i].end}`}</span>
              </GrayTile>);
          for (let j = 1; j < data.length + 1; j++) {
            tiles.push(
              <PrecentageTile precentage={data[i].weeklyRetention[j - 1] || 0}>
                {data[i].weeklyRetention[j - 1] || ""}
              </PrecentageTile>
            );
          }
        }
        return tiles;
      })()}
    </RetentionWrapper>
  );
};

export default Retention;
