import React from 'react'

const Abbrevations = () => {
    return (<div className="abbrevations bg-info">
        {props.required && <small>(*)=>  required</small>}
    </div>);
}

export default Abbrevations;