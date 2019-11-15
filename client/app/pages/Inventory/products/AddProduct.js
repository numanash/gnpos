import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form, Alert } from "react-bootstrap"
import FormInput from '../../../components/FormInput/Index';
import { connect } from "react-redux";
import axios from '../../../../Services/Http';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Required from '../../../components/Required';


const customStyles = {
    control: base => ({
        ...base,
        height: 33,
        minHeight: 33
    })
};
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productDescription: '',
            ref_category: '',
            sku: '',
            productStatus: -1,
            productSalesTax: '',
            productWeight: '',
            productHeight: '',
            productWidth: '',
            productColor: '',
            barcode: '',
            productSC: '',
            productTax: "",
            productDiscount: "",
            categories: []
        }
    }


    componentDidMount() {
        axios.get("/categories").then(res => {
            this.setState({
                categories: res.data,
                categoryError: res.data.length ? undefined : "No category found. Please add category first"
            })
        }).catch(err => {
            this.setState({
                categoryError: err.data.toString()
            })
        })
    }


    handleCategory = (e) => {
        const ref_category = e.value;
        this.setState(() => ({ ref_category }));
    };

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
        const categoryOptions = this.state.categories.map(category => {
            return { value: category.id, label: category.categoryName }
        })
        return (<Aux>
            <CustomCard >
                {this.state.categoryError && <Alert variant="warning" dismissible onClose={() => this.setState({ categoryError: undefined })}>{this.state.categoryError}</Alert>}
                <div className="mb-3">
                    <small ><b className="text-info">*</b> (required)</small>
                </div>
                <Tabs defaultActiveKey="productIdentification" id="product-tab">
                    <Tab eventKey="productIdentification" title="Product Identification" className="py-5">
                        <Row>
                            <Col sm="6">
                                <FormInput label="Product Name" placeholder="Example: Eggs, T-shirt" name="productName" type="text" required size="sm" onChange={this.handleInput} />
                            </Col>
                            <Col sm="6">
                                <Form.Group controlId="ref_category">
                                    <Form.Label>Category <Required /> </Form.Label>
                                    <Select
                                        options={categoryOptions}
                                        styles={customStyles}
                                        name="ref_category"
                                        components={makeAnimated()}
                                        placeholder={
                                            (this.state.ref_category !== '') ? this.state.ref_category : "Select Category"
                                        }
                                        defaultValue={
                                            (this.state.ref_category !== '') ? this.state.ref_category : "Select Category"
                                        }
                                        value={this.state.ref_category}
                                        className="text-dark"
                                        onChange={this.handleCategory}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <FormInput label="Product SKU" placeholder="SKU-123" name="sku" type="text" required size="sm" onChange={this.handleInput} />
                            </Col>

                            <Col sm="6">
                                <FormInput label="Product SKU" placeholder="SKU-123" name="sku" type="text" required size="sm" onChange={this.handleInput} />
                            </Col>
                            <Col sm="6">
                                <Form.Group controlId="ref_category">
                                    <Form.Label>Product Status <Required /> </Form.Label>
                                    <Form.Control size="sm" as="select" onChange={this.handleSelect} name="product_status">
                                        <option value="Active">Available</option>
                                        <option value="De-Active">Not-Available</option>
                                    </Form.Control>
                                    <p className="m-0"><small>Define whether the product is available for sale or not.</small></p>
                                </Form.Group>
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
        products: state.products.data
    }
}
export default connect(mapStateToProps)(AddProduct);