import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form, Alert, Button } from "react-bootstrap"
import FormInput from '../../../components/FormInput/Index';
import { connect } from "react-redux";
import axios from '../../../../Services/Http';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Required from '../../../components/Required';
import DatePicker from "react-datepicker";
import middleware from '../../../../middleware';


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
            name: '',
            selling_price: '',
            description: '',
            ref_category: '',
            sku: '',
            product_status: 'Active',
            tax: '',
            weight: '',
            colour: '',
            height: '',
            width: '',
            service_charges: '',
            barcode: '',
            productSC: '',
            productTax: "",
            discount: "",
            promotional_price: "",
            promotional_start_date: new Date(),
            promotional_end_date: new Date(),
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
    handleStartDate = date => {
        this.setState({
            promotional_start_date: date
        });
    };

    handleEndDate = date => {
        this.setState({
            promotional_end_date: date
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


    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        this.props.dispatch(middleware("porducts").postNew(this.state)).catch(error => {
            console.log({ error });
        })

    }

    render() {
        const categoryOptions = this.state.categories.map(category => {
            return { value: category.id, label: category.categoryName }
        })
        return (<Aux>
            <CustomCard >
                <Form onSubmit={this.onSubmit}>
                    {this.state.categoryError && <Alert size="sm" variant="info" className="py-2" dismissible onClose={() => this.setState({ categoryError: undefined })}>{this.state.categoryError}</Alert>}
                    <Tabs defaultActiveKey="productIdentification" id="product-tab" >
                        {/* Product Identification (PI) */}
                        <Tab eventKey="productIdentification" title="Product Identification" className="pt-5" tabClassName="font-weight-bold bg-gray border-bottom-0">
                            <Row>
                                <Col sm="6">
                                    <FormInput label="Product Name" placeholder="Example: Eggs, T-shirt" name="name" type="text" required size="sm" onChange={this.handleInput} value={this.state.name} />
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
                                    <FormInput label="Product SKU" placeholder="SKU-123" name="sku" type="text" required size="sm" onChange={this.handleInput} value={this.state.sku} />
                                </Col>

                                <Col sm="6">
                                    <FormInput label="Product Barcode" placeholder="AFJLA" name="barcode" type="text" required size="sm" onChange={this.handleInput} value={this.state.barcode} />
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="ref_category">
                                        <Form.Label>Product Status <Required /> </Form.Label>
                                        <Form.Control size="sm" as="select" onChange={this.handleSelect} name="product_status" selected={this.state.product_status}>
                                            <option value="Active">Available</option>
                                            <option value="De-Active">Not-Available</option>
                                        </Form.Control>
                                        <p className="m-0"><small>Define whether the product is available for sale or not.</small></p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                        {/* Product Pricing (PP) */}
                        <Tab eventKey="pricing" title="Pricing" className="pt-5" tabClassName="font-weight-bold bg-gray border-bottom-0">
                            <Row>
                                <Col sm="6">
                                    <FormInput label="Product Tax" placeholder="" name="tax" type="text" size="sm" onChange={this.handleInput} value={this.state.tax} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Discount" placeholder="" name="discount" type="number" size="sm" onChange={this.handleInput} value={this.state.discount} message="Dicount from original price in local currency" />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Price" placeholder="" name="selling_price" type="number" required size="sm" onChange={this.handleInput} value={this.state.selling_price} message="The selling price may be different from the selling price displayed at the point of sale." />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Promotional Price" placeholder="" name="promotional_price" type="number" size="sm" onChange={this.handleInput} value={this.state.promotional_price} message="The promotional price is a special sales price applicable to a product during a specific period." />
                                </Col>

                                <Col sm="6">
                                    <Form.Group controlId="promotional_start_date">
                                        <Form.Label>Promotional Start Date</Form.Label>
                                        <DatePicker
                                            selected={this.state.promotional_start_date}
                                            onChange={this.handleStartDate}
                                            className="form-control input-sm"
                                            wrapperClassName="d-block"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="promotional_end_date">
                                        <Form.Label>Promotional End Date</Form.Label>
                                        <DatePicker
                                            selected={this.state.promotional_end_date}
                                            onChange={this.handleEndDate}
                                            className="form-control input-sm"
                                            wrapperClassName="d-block"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Service Charges" placeholder="" name="service_charges" type="number" size="sm" onChange={this.handleInput} value={this.state.service_charges} />
                                </Col>
                            </Row>

                        </Tab>

                        <Tab eventKey="detail" title="Product Detail" className="pt-5" tabClassName="font-weight-bold bg-gray border-bottom-0">
                            <Row>
                                <Col sm="6">
                                    <FormInput label="Product Width" placeholder="" name="width" type="number" size="sm" onChange={this.handleInput} value={this.state.width} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Height" placeholder="" name="height" type="number" size="sm" onChange={this.handleInput} value={this.state.height} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Weight (kg)" placeholder="" name="weight" type="number" size="sm" onChange={this.handleInput} value={this.state.weight} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Colour" placeholder="" name="colour" type="text" size="sm" onChange={this.handleInput} value={this.state.colour} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Description" as="textarea" rows={6} placeholder="" name="description" type="text" size="sm" onChange={this.handleInput} value={this.state.description} />
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                    <div className="d-inline">
                        <Button variant="success" size="sm" type="submit" title={this.state.categoryError ? 'Please add category first' : ''} disabled={this.state.categoryError ? true : false}>Save</Button>
                        <Button variant="danger" className="ml-2" size="sm" type="button">Cancel</Button>
                    </div>
                </Form>
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