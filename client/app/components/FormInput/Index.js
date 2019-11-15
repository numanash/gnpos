import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import PropTypes from "prop-types";
import Required from '../Required';



const FormInput = (props) => {
    return (<FormGroup controlId={props.name}>
        <FormLabel>{props.label} {props.required && <Required />}</FormLabel>
        <FormControl {...props} />
        {props.error && <small className="text-danger">{props.error}</small>}
    </FormGroup>);
}


FormInput.propTypes = {
    props: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    error: PropTypes.string
}

export default FormInput;