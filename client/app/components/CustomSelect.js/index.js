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
        <FormGroup controlId={props.name} className={props.parentClassName}>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <Select
                options={props.options}
                styles={customStyles}
                name={props.name}
                components={makeAnimated()}
                placeholder={props.placeholder}
                title={props.placeholder}
                value={props.value}
                className={"text-dark " + props.className}
                onChange={props.onChange}
                isMulti={props.isMulti}
                classNamePrefix={props.error ? "border-danger" : ""}
            />
            {props.error && <small className="text-danger">{props.error}</small>}
        </FormGroup>
    );
}

CustomSelect.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    className: PropTypes.string,
    parentClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default CustomSelect;
