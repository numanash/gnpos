import React, { Component } from 'react'
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form, Alert, Button, Table, ListGroup, InputGroup } from "react-bootstrap"
import FormInput from '../../../components/FormInput/Index';
import { connect } from "react-redux";
import axios from '../../../../Services/Http';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
import makeAnimated from 'react-select/animated';
import Required from '../../../components/Required';
import DatePicker from "react-datepicker";
import middleware from '../../../../middleware';
import CustomSelect from '../../../components/CustomSelect.js';

class AddSupply extends Component {
    constructor(props) {
        super(props);
        this.state = {

            suppliers: [],
            supplies: [],
            products: [],
            ref_provider: '',
            supplyName: '',
            total: 0,
            totalItems: 0,
            overAllCost: 0,
            error: undefined,
            validationError: {},
            cursor: 0,


        }
    }


    componentDidMount() {
        this.setState({
            loading: true
        })
        this.props.dispatch(middleware("suppliers").fetchAll());
        this.getSupplies();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.suppliers !== this.props.suppliers) {
            this.setState({
                suppliers: this.props.suppliers.map(supplier => ({ ...supplier, value: supplier.id, label: supplier.name })),
                supplierError: this.props.suppliers.length ? false : true
            })
        }

        if (prevProps.products !== this.props.products) {
            this.setState({
                products: this.props.products
            })
        }
        if (prevProps.supplies !== this.props.supplies && Array.isArray(this.props.supplies)) {
            let supplies = this.props.supplies.map(supply => ({ ...supply, value: supply.id, label: supply.name }))
            this.setState({
                supplies
            })
        }
    }


    resetForm = () => {
        this.setState({
            products: [],
            ref_provider: {},
            supplyName: '',
            total: 0,
            totalItems: 0,
            overAllCost: 0,
            error: undefined,
            validationError: {},
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

    handleInput = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            success: undefined,
            categoryError: undefined
        })

    }


    handleSupplierChange = e => {
        this.setState({
            ref_provider: e,
            validationError: {
                ...this.state.validationError,
                ref_provider: undefined
            }
        })
    }


    onSubmit = e => {
        e.preventDefault();
        this.setState({
            validationError: {}
        })
        if (!this.state.ref_provider.id) {
            return this.setState({
                validationError: {
                    ...this.state.validationError,
                    ref_provider: "Supplier Not Found"
                }
            });
        } else if (!this.state.products.length) {
            return this.setState({
                validationError: {
                    ...this.state.validationError,
                    product: "Atleast 1 product is required"
                }
            });
        } else if (!this.state.supplyId) {
            return this.setState({
                validationError: {
                    ...this.state.validationError,
                    supply: "Please choose supply name"
                }
            });
        }

        let data = {
            products: this.state.products,
            supplyId: this.state.supplyId,
            ref_provider: this.state.ref_provider.id,
            items: this.state.totalItems + this.state.supplyItems,
            value: this.state.overAllCost + this.state.supplyCost
        }

        this.setState({
            error: undefined
        });
        this.props.dispatch(middleware("supplies").postNew(data)).then(result => {
            this.setState({
                success: result.message
            }, () => {
                this.resetForm();
                this.scrollToTop()
            })
        }).catch(error => {
            this.setState({
                error
            }, () => {
                this.scrollToTop()
            })
        })

    }



    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };

    handleSearch = (inputValue, callback) => {

        this.setState({
            isLoading: true,
            noProduct: undefined
        })
        if (!inputValue) {
            return callback([]);
        }
        axios.get(`/products/find?search=${inputValue}&limit=5`).then(res => {
            let products = res.data.map(product => ({ ...product, value: product.id, label: `${product.name}-${product.sku}-${product.barcode}` }));
            return callback(products);
        }).catch(err => {
            if (err.status === 404) {
                return callback([]);
            } else {
                return callback([]);
            }

        })

    }

    handleProductChange = (arr) => {
        if (arr) {
            let products = arr.map(product => {
                return {
                    ...product,
                    price: parseInt(product.purchase_cost),
                    quantity: 1,
                    total: parseInt(product.purchase_cost) * 1
                }
            })
            let overAllCost = _.sumBy(products, 'total'),
                totalItems = _.sumBy(products, 'quantity'),
                total = _.sumBy(products, 'price');
            this.setState({
                products,
                total,
                overAllCost,
                totalItems,
                validationError: {
                    ...this.state.validationError,
                    product: undefined
                }
            })
        } else {
            this.setState({
                products: []
            })
        }
    };

    handleQuantity = e => {

        let products = this.state.products;

        let product = products[e.target.tabIndex];
        if (product) {
            products[e.target.tabIndex] = {
                ...product,
                quantity: parseInt(e.target.value),
                total: parseInt(product.price) * parseInt(e.target.value)
            }
            let overAllCost = _.sumBy(products, 'total');
            let totalItems = _.sumBy(products, 'quantity');
            let total = _.sumBy(products, 'price');
            this.setState({
                products,
                total,
                overAllCost,
                totalItems,
            })

        }
    }
    handlePrice = e => {

        let products = this.state.products;

        let product = products[e.target.tabIndex];
        if (product) {
            products[e.target.tabIndex] = {
                ...product,
                price: parseInt(e.target.value),
                total: parseInt(product.quantity) * parseInt(e.target.value)
            }
            let overAllCost = _.sumBy(products, 'total');
            let totalItems = _.sumBy(products, 'quantity');
            let total = _.sumBy(products, 'price');
            this.setState({
                products,
                totalItems,
                total,
                overAllCost
            })

        }
    }

    removeItem = e => {


        let products = _.remove(this.state.products, (product) => product.label !== e.currentTarget.name);


        this.setState({
            products, selection: 1
        })
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            type: 'smooth'
        });
    }
    addProduct = e => {
        console.log({ name: e.target.name });
    }

    getSupplies = () => {
        this.props.dispatch(middleware("supplies").fetchAll());
    }

    handleSupplyChange = e => {
        this.setState({
            supplyId: e.value,
            supplyName: e.label,
            supplyItems: e.items,
            supplyCost: e.value,
            validationError: {
                ...this.state.validationError,
                supply: undefined
            }
        })
    }

    addSupply = e => {
        this.setState({
            error: undefined,
            success: undefined
        })
        if (this.state.supName)
            this.props.dispatch(middleware("supplies").postNew({ name: this.state.supName }, 'add')).then(res => {
                this.setState({
                    success: res.message,
                    selection: null
                }, () => {
                    this.getSupplies();
                })
            }).catch(e => {
                this.setState({
                    error: e.error
                })
            })
    }


    handleKeyDown = (e) => {
        const { cursor, products } = this.state
        // arrow up/down button should select next/previous list element
        if (e.key === "ArrowDown" && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (e.key === "ArrowUp" && cursor < products.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }))
        }
    }





    moveFocus = () => {
        const node = this.list_ref;
        node.addEventListener('keydown', function (e) {
            const active = document.activeElement;
            if (e.keyCode === 40 && active.nextSibling) {
                if (active.nextSibling.childElementCount) {
                    active.nextSibling.firstChild.focus();
                } else {
                    active.nextSibling.focus();
                }
                active.blur();

            }
            if (e.keyCode === 38 && active.previousSibling) {
                active.previousSibling.focus();
                active.blur();

            }
        });
    }

    render() {
        const suppliersOption = this.state.suppliers.map(supplier => {
            return { value: supplier.id, label: supplier.name }
        });
        const { cursor, products, validationError } = this.state;
        const { ref_provider, supply, product } = validationError;

        return (<Aux>
            <Form onSubmit={this.onSubmit} noValidate>
                {this.state.success && <Alert size="sm" variant="success" dismissible onClose={() => this.setState({ success: undefined })}>{this.state.success}</Alert>}
                {this.state.error && <Alert size="sm" variant="danger" dismissible onClose={() => this.setState({ error: undefined })}>{this.state.error}</Alert>}
                <Row>
                    <Col lg="6">
                        <CustomCard>

                            <Form.Group controlId="search_product">
                                <Form.Label>Search Product</Form.Label>
                                <AsyncSelect
                                    isMulti
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={this.handleSearch}
                                    onChange={this.handleProductChange}
                                    onInputChange={this.handleInputChange}
                                    value={this.state.selection}
                                    placeholder="Search Product"
                                    classNamePrefix={product ? "border-danger" : ""}
                                />
                                {product && <p><small className="text-danger">{product}</small></p>}
                            </Form.Group>
                        </CustomCard>
                    </Col>
                    <Col lg="6">
                        <CustomCard>
                            <Form.Label>Add/Select Supply</Form.Label>
                            {this.state.addNewSupply ?

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
                                        value={this.state.supName}
                                        onChange={this.handleInput}
                                    />
                                    <InputGroup.Append>
                                        <Button onClick={this.addSupply}>
                                            Add Supply
                                    </Button>
                                    </InputGroup.Append>

                                </InputGroup> :
                                <>
                                    {supply && <p><small className="text-danger">{supply}</small></p>}
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <Button onClick={() => {
                                                this.setState({
                                                    addNewSupply: true
                                                })
                                            }}>
                                                New Supply
                                    </Button>
                                        </InputGroup.Prepend>
                                        <Select
                                            options={this.state.supplies}
                                            isMulti={false}
                                            value={this.state.supplyName}
                                            className="form-control p-0"
                                            placeholder="Select Supply"
                                            onChange={this.handleSupplyChange}
                                            classNamePrefix={supply ? "border-danger" : ""}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text className="w-30">Supply: {this.state.supplyName}</InputGroup.Text>
                                        </InputGroup.Append>

                                    </InputGroup>

                                </>
                            }
                        </CustomCard>
                    </Col>
                    <Col lg="12">
                        <CustomCard>
                            <Table responsive={true}>
                                <thead>
                                    <tr>
                                        <th width="40%">Product Name</th>
                                        <th width="20%">Quantity</th>
                                        <th width="20%">Purchase Price</th>
                                        <th width="20%">Total</th>
                                        {/* <th width=""></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => {
                                        return <tr name={product.label} id={product.value} key={product.value}>
                                            <td>{product.label}</td>
                                            <td>
                                                <Form.Control as="input" min="0" type="number" name={product.label} onChange={this.handleQuantity} tabIndex={index} size="sm" value={products[index]["quantity"]} />
                                            </td>
                                            <td className="d-inline-flex">
                                                <Form.Control as="input" min="0" type="number" name={product.label} onChange={this.handlePrice} tabIndex={index} size="sm" value={products[index]["price"]} />
                                            </td>
                                            <td>
                                                Rs. {product.total}
                                            </td>
                                            {/* <td>
                                                <Button size="sm" onClick={this.removeItem} name={product.label} tabIndex={index} variant="danger"><i className="fa fa-window-close" aria-hidden="true"></i></Button>
                                            </td> */}
                                        </tr>
                                    })}

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th width="40%">Total</th>
                                        <th width="20%">Qt. {this.state.totalItems}</th>
                                        <th width="20%">Rs. {this.state.total}</th>
                                        <th width="20%">Rs. {this.state.overAllCost}</th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </CustomCard>
                    </Col>
                    <Col sm="12">
                        <CustomCard>
                            <Row className="align-items-center">
                                <Col sm="6">
                                    {this.state.supplierError && <Alert size="sm" className="py-1 w-75" variant="warning">Please add supplier first. <Button size="sm" className="bg-transparent no-foucs text-primary border-0" onClick={()=>this.props.history.push("/supplier/add")}>Create New</Button></Alert>}
                                    <CustomSelect
                                        className="w-75 "
                                        placeholder="Select Supplier"
                                        onChange={this.handleSupplierChange}
                                        options={this.state.suppliers}
                                        value={this.state.ref_provider}
                                        label={<>Select Supplier (<Button size="sm" className="bg-transparent no-foucs text-primary border-0" onClick={()=>this.props.history.push("/supplier/add")}>Create New</Button>) </>}
                                        error={ref_provider}
                                    />


                                </Col>
                                <Col sm="6" className="text-right">
                                    <Button type="submit" className="w-25">
                                        Create Supply
                                </Button>
                                </Col>
                            </Row>
                        </CustomCard>
                    </Col>
                </Row>
            </Form>
        </Aux >);
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.data,
        suppliers: state.suppliers.data,
        supplies: state.supplies.data
    }
}
export default connect(mapStateToProps)(AddSupply);