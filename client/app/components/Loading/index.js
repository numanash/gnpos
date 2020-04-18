import React from 'react';
import {ProgressBar} from "react-bootstrap";

const Loading = (props) => {
    return ( props.isLoading ? <ProgressBar now={100} animated /> :<></>);
}
 
export default Loading;