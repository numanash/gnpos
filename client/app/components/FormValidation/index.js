import React, { Component } from "react";
import { Form } from "react-bootstrap";
class FormValidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        }
    }

    handleSubmit = event => {

        event.preventDefault();
        const form = event.currentTarget;
        let localErrors = {};
        if (event.currentTarget.checkValidity() === false) {
            for (let i = 0; i < form.length; i++) {
                const elem = form[i];
                if (!elem.validity.valid) {
                    localErrors[elem.name] = elem.validationMessage;
                }
            }
            this.props.onError({
                localErrors,
                error: "Please check out the errors and fix"
            });
            return event.stopPropagation();

        } else {
            this.setState({
                localErrors: {}
            });
            this.props.onSubmit();
        }
        this.setState({
            validate: true
        });
    };

    render() {
        const { validated } = this.state;
        return (
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>

                {this.props.children}
            </Form>
        );
    }
}

export default FormValidation;
