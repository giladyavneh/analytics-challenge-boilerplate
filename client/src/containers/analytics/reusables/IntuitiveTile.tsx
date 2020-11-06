import React, { ReactChild, ReactElement, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../ErrorBoundries";
import { FilterBoard, Frame, FrameHeader, SizeController } from "./StyledComponents";
import { eventName, os } from "../../../models/event";

type filterTypes = "date" | "search" | "browser" | "type";

interface IntuitiveTileProps {
  color: string;
  tileName: string;
  loading: boolean;
  filters?: { [index: string]: filterTypes };
}

const IntuitiveTile: React.FC<IntuitiveTileProps> = ({
  color,
  tileName,
  children,
  loading,
  filters = {},
}) => {
  const [height, setHeight] = useState<number>(400);
  const [width, setWidth] = useState<number>(800);
  const [chart, setChart] = useState<React.ReactElement[] | null | undefined>([]);
  const Self: React.RefObject<HTMLDivElement> = useRef(null);
  const [params, setParams]=useState()
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
                    {filter}{" "} <input type="date" />
                  </label>
                );
              case "search":
                return (
                  <label>
                    {filter}{" "}<input />
                  </label>
                );
              case "type":
                return (
                  <label>
                    {filter}{" "}
                    <select>
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
                    <select>
                    <option></option>

                      <option>windows</option>
                      <option>mac</option>
                      <option>linux</option>
                      <option>ios</option>
                      <option>android</option>
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
