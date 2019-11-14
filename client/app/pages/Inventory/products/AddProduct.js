import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import { Tab } from "react-bootstrap";
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Aux>

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Form
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Perform
                </Tab>
            </Tabs>
        </Aux>);
    }
}

export default AddProduct;