import React, { ErrorInfo } from "react";

interface ErrorState{
    hasError:boolean
}

interface Sizes{
    height:number;
    width:number;
}

class ErrorBoundary extends React.Component<Sizes,ErrorState> {
    constructor(props:Sizes) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error:Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error:Error, errorInfo:ErrorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
    render(){
        if (this.state.hasError) return (
            <img height={this.props.height} width={this.props.width} src="https://64.media.tumblr.com/2321767b60776e5cb244906bbe9ce7b2/tumblr_inline_msk4s3EnfY1qz4rgp.gif"/>
        )
        return this.props.children
    }
}

export default ErrorBoundary;