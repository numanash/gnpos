import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form, Alert, Button } from "react-bootstrap";
import FormInput from '../../../components/FormInput/Index';
import { connect } from "react-redux";
import axios from '../../../../services/Http';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Required from '../../../components/Required';
import DatePicker from "react-datepicker";
import middleware from '../../../../middleware';
import scrollToTop from '../../../constants/ScrollToTop';
import FormValidation from '../../../components/FormValidation';

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
            selling_price: 0,
            description: '',
            ref_category: {},
            sku: '',
            product_status: 'Active',
            tax: 0,
            weight: 0,
            colour: 0,
            height: 0,
            width: 0,
            service_charges: 0,
            barcode: '',
            productSC: '',
            productTax: 0,
            discount: 0,
            promotional_price: 0,
            promotional_start_date: new Date(),
            promotional_end_date: new Date(),
            categories: [],
            subCategories:[],
            localErrors: {}
        }
    }


    componentDidMount() {

        if (this.props.edit) {
            this.setState({
                ...this.state,
                ...this.props.product,
                ref_category: {
                    value: this.props.product.ref_category,
                    label: ""
                }
            })

        }
        axios.get("/categories").then(res => {
            if (this.props.edit) {
                this.setState({
                    categories: res.data.map(category => {
                        if (category.id === this.props.product.ref_category) {
                            this.setState({
                                ref_category: {
                                    value: category.id,
                                    label: category.categoryName
                                }
                            })
                        }
                        return category;
                    }),
                    categoryError: res.data.length ? undefined : "No category found. Please add category first"
                })
            } else {
                this.setState({
                    categories: res.data,
                    categoryError: res.data.length ? undefined : "No category found. Please add category first"
                })
            }
        }).catch(err => {
            this.setState({
                categoryError: err.data.toString()
            })
        })

    }

    resetForm = e => {
        this.setState({
            name: '',
            selling_price: '',
            description: '',
            ref_category: '',
            sku: '',
            subCategories:[],
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
            localErrors: {}
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
        const ref_category = e;
        axios.get(`/categories/sub-categories/${ref_category.value}`).then(res=>{
            this.setState({
                subCategories:res.data,
                ref_category
            })
        }).catch(err=>{
            console.log({err});
            this.setState(() => ({ ref_category,subCategories:[] }));
        })
    };

    handleSubCategory = (e)=>{
        const ref_category = e;
        this.setState({
            ref_category
        })
    }

    handleInput = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            localErrors: {
                ...this.state.localErrors,
                [e.target.name]: undefined
            }
        })
    }


    onUpdate = e => {

        if (!this.state.ref_category.value) {
            this.setState({
                ...this.state,
                localErrors: {
                    ...this.state.localErrors,
                    ref_category: "Catgeory is required"
                },
                error: "Please choose category first"

            })
            return;
        }
        this.setState({
            error: undefined,
            success: undefined
        })

        let ref_category = this.state.ref_category.value;

        this.props.dispatch(middleware("products").update({ ...this.state, ref_category }, this.props.product.id)).then(result => {
            this.setState({
                success: result.message
            }, () => {
                scrollToTop();
            })
        }).catch(error => {
            this.setState({
                error: error
            }, () => {
                scrollToTop();
            })
        })

    }


    onSubmit = e => {

        if (!this.state.ref_category.value) {
            this.setState({
                ...this.state,
                localErrors: {
                    ...this.state.localErrors,
                    ref_category: "Catgeory is required"
                },
                error: "Please choose category first"

            })
            return;
        }
        this.setState({
            error: undefined,
            success: undefined
        })

        let ref_category = this.state.ref_category.value;
        this.props.dispatch(middleware("products").postNew({ ...this.state, ref_category })).then(result => {
            this.setState({
                success: result.message
            }, () => {
                this.resetForm();
                scrollToTop();
            })
        }).catch(error => {
            this.setState({
                error: error.message
            }, () => {
                scrollToTop();
            })
        })

    }

    render() {
        const categoryOptions = this.state.categories.map(category => {
            return { value: category.id, label: category.categoryName }
        });
        const subCategories = this.state.subCategories.map(category=>{
            return {value: category.id, label: category.categoryName}
        })
        const { name,
            selling_price,
            description,
            ref_category,
            sku,
            product_status,
            tax,
            weight,
            colour,
            height,
            width,
            service_charges,
            barcode,
            productSC,
            productTax,
            discount,
            promotional_price,
            promotional_start_date,
            promotional_end_date } = this.state.localErrors
        return (<Aux>
            <CustomCard >
                <FormValidation onSubmit={this.props.edit ? this.onUpdate : this.onSubmit} onError={(props) => this.setState({
                    localErrors: props.localErrors,
                    error: props.error
                })}>
                    {this.state.categoryError && <Alert size="sm" variant="info" className="py-2" dismissible onClose={() => this.setState({ categoryError: undefined })}>{this.state.categoryError}</Alert>}
                    {this.state.error && <Alert size="sm" variant="danger" className="py-2" dismissible onClose={() => this.setState({ error: undefined })}>{this.state.error}</Alert>}
                    {this.state.success && <Alert size="sm" variant="success" className="py-2" dismissible onClose={() => this.setState({ success: undefined })}>{this.state.success}</Alert>}
                    <Tabs defaultActiveKey="productIdentification" id="product-tab" >
                        {/* Product Identification (PI) */}
                        <Tab eventKey="productIdentification" title="Product Identification" className="pt-5" tabClassName="font-weight-bold bg-gray text-dark border-bottom-0">
                            <Row>
                                <Col sm="6">
                                    <FormInput label="Product Name" placeholder="Example: Eggs, T-shirt" error={name} name="name" type="text" required size="sm" onChange={this.handleInput} value={this.state.name} />
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
                                            value={this.state.ref_category}
                                            className={`text-dark ${ref_category ? 'border-danger' : ''}`}
                                            onChange={this.handleCategory}
                                        />
                                        {ref_category && <p className="m-0"><small className="text-danger">{ref_category}</small></p>}
                                    </Form.Group>
                                </Col>
                                {this.state.subCategories.length ? 

                                <Col sm="6">
                                    <Form.Group controlId="ref_category">
                                        <Form.Label>Sub Category</Form.Label>
                                        <select placeholder="Select SubCategory">
                                            {this.state.subCategories.map(category=>{
                                            return <option value={category.value}>{category.label}</option>
                                            })}
                                        </select>
                                    </Form.Group>
                                </Col>
                                : null}
                                <Col sm="6">
                                    <FormInput label="Product SKU" error={sku} placeholder="SKU-123" name="sku" type="text" required size="sm" onChange={this.handleInput} value={this.state.sku} />
                                </Col>

                                <Col sm="6">
                                    <FormInput label="Product Barcode" error={barcode} placeholder="AFJLA" name="barcode" type="text" size="sm" onChange={this.handleInput} value={this.state.barcode} />
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="product_status">
                                        <Form.Label>Product Status <Required /> </Form.Label>
                                        <Form.Control size="sm" as="select" onChange={this.handleSelect} name="product_status" selected={this.state.product_status}>
                                            <option value="Active">Available</option>
                                            <option value="De-Active">Not-Available</option>
                                        </Form.Control>
                                        <p className="m-0"><small>Define whether the product is available for sale or not.</small></p>
                                        {product_status && <p className="m-0"><small className="text-danger">{product_status}</small></p>}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                        {/* Product Pricing (PP) */}
                        <Tab eventKey="pricing" title="Pricing" className="pt-5" tabClassName="font-weight-bold bg-gray text-dark border-bottom-0">
                            <Row>
                                <Col sm="6">
                                    <FormInput label="Product Tax" placeholder="" name="tax" type="number" size="sm" onChange={this.handleInput} value={this.state.tax} />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Discount" placeholder="" name="discount" type="number" size="sm" onChange={this.handleInput} value={this.state.discount} message="Dicount from original price in local currency" />
                                </Col>
                                <Col sm="6">
                                    <FormInput label="Product Price" placeholder="" error={selling_price} name="selling_price" type="number" required size="sm" onChange={this.handleInput} value={this.state.selling_price} message="The selling price may be different from the selling price displayed at the point of sale." />
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

                        <Tab eventKey="detail" title="Product Detail" className="pt-5" tabClassName="font-weight-bold bg-gray text-dark border-bottom-0">
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
                        <Button variant="success" size="sm" type="submit">{this.props.edit ? "Update" : "Add"} Product</Button>
                        <Button variant="danger" className="ml-2" size="sm" type="button">Cancel</Button>
                    </div>
                </FormValidation>
            </CustomCard>
        </Aux >);
    }
}

export default connect()(AddProduct);