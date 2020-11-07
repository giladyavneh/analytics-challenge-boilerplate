import React, { ReactChild, ReactElement, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../ErrorBoundries";
import { FilterBoard, Frame, FrameHeader, SizeController } from "./StyledComponents";
import { eventName, os } from "../../../models/event";

export const hour = 1000 * 60 * 60;
export const day = hour * 24;
export const week = day * 7;

type filterTypes = "date" | "search" | "browser" | "type";

interface IntuitiveTileProps {
  color: string;
  tileName: string;
  loading: boolean;
  filters?: { [index: string]: filterTypes };
  filterFunctions?:{ [index: string]: (param:string)=>void };
  rerender?:boolean
}

const IntuitiveTile: React.FC<IntuitiveTileProps> = ({
  color,
  tileName,
  children,
  loading,
  filters = {},
  filterFunctions
}) => {
  const [height, setHeight] = useState<number>(400);
  const [width, setWidth] = useState<number>(800);
  const [chart, setChart] = useState<React.ReactElement[] | null | undefined>([]);
  const Self: React.RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const childrenWithProps = React.Children.map(children, (child) => {
      const props = { height: height - 80, width };
      if (React.isValidElement(child)) {
        console.log(child.props);
        return React.cloneElement(child, props);
      }

      return;
    });
    setChart(childrenWithProps);
  }, [width, height, loading]);
  function resize(e: React.DragEvent<HTMLDivElement>): void {
    e.stopPropagation();
    if (Self.current !== null) {
      let { top, left } = Self.current.getBoundingClientRect();
      let { clientX, clientY } = e;
      if (clientX !== 0 || clientY !== 0) {
        setWidth(clientX - left);
        setHeight(clientY - top);
      }
    }
  }

  return (
    <Frame color={color} ref={Self}>
      <FrameHeader color={color}>{tileName}</FrameHeader>
      <ErrorBoundary height={height} width={width}>
        <FilterBoard>
          {Object.keys(filters).map((filter) => {
            switch (filters[filter]) {
              case "date":
                return (
                  <label>
                    {filter}{" "} <input type="date" onChange={({target})=>{
                    if (filterFunctions){
                      if (filterFunctions[filter]) filterFunctions[filter](target.value.toString())
                    }
                  }}/>
                  </label>
                );
              case "search":
                return (
                  <label>
                    {filter}{" "}<input style={{width:'80px'}} onChange={({target})=>{
                    if (filterFunctions){
                      if (filterFunctions[filter]) filterFunctions[filter](target.value)
                    }
                  }}/>
                  </label>
                );
              case "type":
                return (
                  <label>
                    {filter}{" "}
                    <select onChange={({target})=>{
                    if (filterFunctions){
                      if (filterFunctions[filter]) filterFunctions[filter](target.value)
                    }
                  }}>
                    <option></option>
                      <option>login</option>
                      <option>signup</option>
                      <option>admin</option>
                    </select>
                  </label>
                );
                case "browser":
                    return <label>
                    {filter}{" "}
                    <select onChange={({target})=>{
                    if (filterFunctions){
                      if (filterFunctions[filter]) filterFunctions[filter](target.value)
                    }
                  }}>
                    <option></option>
                      <option>chrome</option>
                      <option>safari</option>
                      <option>edge</option>
                      <option>firefox</option>
                      <option>ie</option>
                      <option>other</option>
                    </select>
                  </label>
            }
          })}
        </FilterBoard>
        <div>{loading ? "loading" : chart}</div>
      </ErrorBoundary>
      <SizeController color={color} onDrag={resize}></SizeController>
    </Frame>
  );
};

export default IntuitiveTile;
