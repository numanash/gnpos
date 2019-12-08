import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import { Form, Button, Alert } from 'react-bootstrap';
import FormInput from '../../../components/FormInput/Index';
import axios from '../../../../Services/Http';
import CustomCard from '../../../components/CustomCard';

class EditSupplyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            unit_price: 0
        }
    }
    componentDidMount() {
        let stockFollowId = this.props.match.params.id;
        axios.get(`/supplies/product/${stockFollowId}`).then(res => {
            this.setState({
                ...res.data,
                old_quantity: res.data.quantity
            })
        })


    }
    handleInput = e => {
        this.setState({
            ...this.state,
            [e.target.name]: parseInt(e.target.value)
        })
    }


    onSubmit = e => {
        e.preventDefault();
        let state = this.state, quantity = state.quantity, quantity_after = state.quantity_after, quantity_before = state.quantity_before;
        this.setState({
            success: undefined,
            error: undefined
        })
        if (quantity <= state.old_quantity) {
            let newQuantity = state.old_quantity - quantity;
            quantity_after -= newQuantity;
        } else if (quantity >= state.old_quantity) {
            quantity_after = quantity_before + quantity;
        }
        let data = {
            quantity,
            quantity_after,
            unit_price: state.unit_price ? state.unit_price : 0,
            id: state.id
        }
        axios.put(`/supplies/product/${state.id}`, data).then(res => {
            this.setState({
                success: res.data.message,
                old_quantity: quantity,
                quantity_after,
                quantity_before
            })
        }).catch(err => {
            this.setState({
                error: err.response.data.message
            })
        })

    }
    render() {
        return (<Aux>
            <CustomCard>
                {this.state.success && <Alert variant="success">{this.state.success}</Alert>}
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                <Form onSubmit={this.onSubmit}>
                    <FormInput type="number" name="quantity" label="Quantity" onChange={this.handleInput} value={this.state.quantity} />
                    <FormInput type="number" name="unit_price" label="Price" onChange={this.handleInput} value={this.state.unit_price} />
                    <Button type="submit">Save</Button> &nbsp;
                    <Button type="button" variant="danger">Cancel</Button>
                </Form>

            </CustomCard>
        </Aux>);
    }
}

export default EditSupplyProduct;