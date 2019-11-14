import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const FormInput = (props) => {
    return (<FormGroup controlId={props.name}>
        <FormLabel>{props.label}</FormLabel>
        <FormControl {...props} />
        {props.error && <small className="text-danger">{props.error}</small>}
    </FormGroup>);
}

export default FormInput;