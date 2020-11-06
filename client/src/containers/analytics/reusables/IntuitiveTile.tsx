import React, { ReactChild, ReactElement, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../ErrorBoundries";
import {FilterBoard, Frame, FrameHeader, SizeController} from "./StyledComponents"

interface IntuitiveTileProps{
    color:string;
    tileName:string;
}

const IntuitiveTile:React.FC<IntuitiveTileProps>=({color, tileName, children})=>{
    const [height, setHeight]=useState<number>(400)
    const [width, setWidth]=useState<number>(800)
    const [chart, setChart]=useState<React.ReactElement[]|null|undefined>([])
    const Self:React.RefObject<HTMLDivElement>=useRef(null)
    useEffect(()=>{
        const childrenWithProps=React.Children.map(children,child=>{
            const props={height:height-80,width}
            if (React.isValidElement(child)){
                return React.cloneElement(child,props)
            }
            return;
        })
        setChart(childrenWithProps)
    },[width,height])
    function resize(e:React.DragEvent<HTMLDivElement>):void{
        e.stopPropagation()
        if (Self.current!==null){
            let {top,left}=Self.current.getBoundingClientRect()
            let {clientX, clientY}=e
            if (clientX!==0||clientY!==0){

                setWidth(clientX-left)
                setHeight(clientY-top)
            }
        }
        
    }
    return (
        <Frame color={color} ref={Self}>
            
            <FrameHeader color={color}>
                {tileName}
            </FrameHeader>
            <ErrorBoundary height={height} width={width}>
            <FilterBoard></FilterBoard>
            <div>
                {chart}
            </div>
            
            </ErrorBoundary>
            <SizeController color={color} onDrag={resize}></SizeController>
        </Frame>
    )
}

export default IntuitiveTile;