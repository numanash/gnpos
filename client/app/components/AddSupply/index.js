import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import axios from '../../../Services/Http';

class BasicSupply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supName: ""
        }
    }

    addSupply = e => {
        e.preventDefault();
        axios.post("/supplies", this.state.supName).then(res => {
            this.setState
        })
    }

    render() {
        return (
            <Form onSubmit={this.addSupply}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button onClick={() => {
                            this.setState({
                                addNewSupply: false
                            })
                        }}>
                            Select Supply
                        </Button>
                    </InputGroup.Prepend>

                    <Form.Control
                        placeholder="Supply Name"
                        name="supName"
                    />
                    <InputGroup.Append>
                        <Button >
                            Add Supply
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        );
    }
}

export default BasicSupply;