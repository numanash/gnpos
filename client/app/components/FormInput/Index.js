import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import PropTypes from "prop-types";
import Required from '../Required';



const FormInput = (props) => {
    return (<FormGroup controlId={props.name}>
        <FormLabel>{props.label} {props.required && <Required />}</FormLabel>
        <FormControl {...props} className={`${props.className ? props.className : ''} ${props.error && "border-danger"}`} />
        {props.message && <p className="m-0"><small>{props.message}</small></p>}
        {props.error && <p className="m-0"><small className="text-danger">{props.error}</small></p>}
    </FormGroup>);
}


FormInput.propTypes = {
    props: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func
}

export default FormInput;