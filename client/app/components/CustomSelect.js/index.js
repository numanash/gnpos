import React from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";
import { FormGroup, FormLabel } from 'react-bootstrap';

const customStyles = {
    control: base => ({
        ...base,
        height: 33,
        minHeight: 33
    })
};

const CustomSelect = (props) => {
    return (
        <FormGroup controlId={props.name}>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <Select
                options={props.options}
                styles={customStyles}
                name={props.name}
                components={makeAnimated()}
                placeholder={props.placeholder}
                value={props.value}
                className="text-dark"
                onChange={props.onChange}
            />
        </FormGroup>
    );
}

CustomSelect.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
}

export default CustomSelect;
