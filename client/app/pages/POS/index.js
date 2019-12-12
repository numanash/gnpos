import React, { Component } from 'react';
import { Card, Row, Col, Table, Form } from "react-bootstrap";
import CustomCard from '../../components/CustomCard';
import Aux from '../../constants/hoc/_Aux';
import CustomSelect from '../../components/CustomSelect.js';
import AsyncSelect from 'react-select/async';

import axios from '../../../Services/Http';
import { connect } from "react-redux";
import middleware from '../../../middleware';
import "../../../styles/pages/pos.scss";


class PointOfSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            customers: [],
            products: [],
            selectedCustomer: { value: "Walk In Customer", },
            total: 0,
            totalItems: 0,
            overAllCost: 0,
        }
    }
    componentDidMount() {
        this.props.dispatch(middleware("customers").fetchAll())
    }
    componentDidUpdate(prevProps) {
        if (this.props.customers !== prevProps.customers) {
            let customers = this.props.customers.map(customer => ({ value: customer.id, label: customer.name }))
            this.setState({
                customers
            })
        }
    }

    handleSelectedCustomer = e => {
        this.setState({
            selectedCustomer: e
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
            let products = res.data.map(product => ({ ...product, value: product.id, label: product.name }));
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
                    price: parseInt(product.selling_price),
                    quantity: 1,
                    total: parseInt(product.selling_price) * 1
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
            let quantity = parseInt(e.target.value) ? parseInt(e.target.value) : 1;
            products[e.target.tabIndex] = {
                ...product,
                quantity,
                total: parseInt(product.price) * quantity
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

    render() {
        const { products } = this.state;
        return (<Aux>
            <div className="point_of_sale">
                <Row>
                    <Col sm="12" md="5">
                        <CustomCard>
                            <CustomSelect placeholder="Select Customer" name="selectedCustomer" options={this.state.customers} onChange={this.handleSelectedCustomer} value={this.state.selectedCustomer} />
                            <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={this.handleSearch}
                                onChange={this.handleProductChange}
                                onInputChange={this.handleInputChange}
                                value={this.state.selection}
                                placeholder="Search Product"
                            // classNamePrefix={product ? "border-danger" : ""}
                            />

                            <Table className="pos_product_table">
                                <thead className="bg-gray-dark">
                                    <tr>
                                        <th width="40%">Product</th>
                                        <th width="15%">Price</th>
                                        <th width="15%">Qty</th>
                                        <th width="30%">SubTotal</th>
                                        {/* <th width="15%"><i className="fa fa-trash"> </i></th> */}
                                    </tr>
                                </thead>
                                <tbody className="light-gray border-bottom">
                                    {products.map((product, index) => {
                                        return <tr name={product.label} id={product.value} key={product.value}>
                                            <td>{product.label}</td>
                                            <td>
                                                {product.price}
                                            </td>
                                            <td className="d-inline-flex">
                                                <Form.Control as="input" type="number" name={product.label} onChange={this.handleQuantity} tabIndex={index} size="sm" value={products[index]["quantity"]} />
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
                                <tfoot >
                                    <tr>
                                        <td className="text-left">Items</td>
                                        <td className="font-weight-bold text-right">{this.state.totalItems}</td>
                                        <td className="text-left">Total</td>
                                        <td className="font-weight-bold text-right">{this.state.overAllCost}</td>
                                    </tr>
                                </tfoot>
                            </Table>

                        </CustomCard>

                    </Col>
                    <Col sm="12" md="7">

                        <CustomCard>


                        </CustomCard>
                    </Col>
                </Row>
            </div>
        </Aux>);
    }
}
const mapStateToProps = state => {
    return {
        customers: state.customers.data
    }
}

export default connect(mapStateToProps)(PointOfSale);