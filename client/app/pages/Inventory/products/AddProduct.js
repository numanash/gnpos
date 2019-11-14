import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form } from "react-bootstrap"
import FormInput from '../../../components/FormInput/Index';
import { connect } from "react-redux";



class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
        }
    }

    handleInput = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            localError: {
                ...this.state,
                [e.target.name]: undefined
            }
        })
    }

    render() {
        return (<Aux>
            <CustomCard >
                <Tabs defaultActiveKey="productIdentification" id="product-tab">
                    <Tab eventKey="productIdentification" title="Product Identification" className="py-5">
                        <Row>
                            <Col sm="12">
                                <FormInput label="Product Name (*)" placeholder="Example: Eggs, T-shirt" name="productName" type="text" required size="sm" onChange={this.handleInput} />
                            </Col>
                            <Col sm="6">


                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">

                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                        Perform
                </Tab>
                </Tabs>
            </CustomCard>
        </Aux>);
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.data,
        products: state.products.data
    }
}
export default connect(mapStateToProps)(AddProduct);