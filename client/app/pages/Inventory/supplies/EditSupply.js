import React, { Component } from 'react';
import { connect } from "react-redux";
import Aux from '../../../constants/hoc/_Aux';
import CustomCard from '../../../components/CustomCard';
import FormInput from '../../../components/FormInput/Index';
import CustomSelect from '../../../components/CustomSelect.js';
import FormValidation from '../../../components/FormValidation';
import axios from '../../../../Services/Http';
import middleware from '../../../../middleware';
import { Alert, Button } from 'react-bootstrap';


class EditSupply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ref_provider: {},
            loading: true,
            localErrors: {},
            suppliers: []

        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get("/supplies/single/" + this.props.match.params.id).then(result => {
            let data = result.data;
            data = {
                name: data.name,
                description: data.description ? data.description : "",
                id: data.id,
                ref_provider: {
                    value: data.ref_provider,
                    label: ""
                },
                provider: data.ref_provider
            }
            this.setState({
                ...this.state,
                ...data
            }, () => {
                this.props.dispatch(middleware("suppliers").fetchAll());
            })
        })



    }

    componentDidUpdate(prevProps) {
        if (prevProps.suppliers !== this.props.suppliers) {
            this.setState({
                suppliers: this.props.suppliers.map(supplier => {
                    if (supplier.id === this.state.provider) {
                        this.setState({
                            ...this.state,
                            ref_provider: {
                                value: supplier.id,
                                label: supplier.name
                            }
                        })
                    }
                    return { ...supplier, value: supplier.id, label: supplier.name }
                })
            })
        }

    }


    handleSupplierChange = e => {
        this.setState({
            ref_provider: e,
            success: undefined,
            validationError: {
                ...this.state.validationError,
                ref_provider: undefined
            }
        })
    }


    handleInput = e => {
        this.setState({
            ...this.state,
            success: undefined,
            [e.target.name]: e.target.value
        })
    }


    onUpdate = e => {
        let data = this.state;
        this.setState({
            success: undefined,
            error: undefined
        })
        data = {
            name: data.name,
            description: data.description,
            ref_provider: data.ref_provider.value,
            id: data.id
        }
        axios.put("/supplies/single/" + data.id, data).then(res => {
            this.setState({
                success: res.data.message
            })
        }).catch(error => {
            this.setState({ error: error.response.data.message })
        })
    }
    render() {
        const { name, description, ref_provider } = this.state.localErrors;
        return (<Aux>
            <CustomCard>
                {this.state.success && <Alert variant="success">{this.state.success}</Alert>}
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                <FormValidation onSubmit={this.onUpdate}>
                    <FormInput error={name} type="text" name="name" size="sm" label="Supply Name" onChange={this.handleInput} required value={this.state.name} />
                    <CustomSelect
                        placeholder="Select Supplier"
                        onChange={this.handleSupplierChange}
                        options={this.state.suppliers}
                        value={this.state.ref_provider}
                        label="Select Supplier"
                        error={ref_provider}
                        required

                    />
                    <FormInput error={description} as="textarea" rows="5" name="description" size="sm" label="Supply description" onChange={this.handleInput} value={this.state.description} />
                    <Button type="submit">Update Supply</Button>&nbsp;<Button type="button" variant="danger" onClick={()=>this.props.history.push("/inventory/supply/list")}>Cancel</Button>
                </FormValidation>
            </CustomCard>
        </Aux>);
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products.data,
        suppliers: state.suppliers.data,
        supplies: state.supplies.data
    }
}
export default connect(mapStateToProps)(EditSupply);