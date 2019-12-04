import React, { Component } from 'react'
import Aux from '../../constants/hoc/_Aux';
import CustomCard from '../../components/CustomCard';
import { Tabs, Tab, Row, Col, Form, Alert, Button } from "react-bootstrap"
import FormInput from '../../components/FormInput/Index';
import { connect } from "react-redux";
import axios from '../../../Services/Http';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Required from '../../components/Required';
import DatePicker from "react-datepicker";
import middleware from '../../../middleware';
import CustomSelect from '../../components/CustomSelect.js/index.js';
import FormValidation from '../../components/FormValidation';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: "",
            phone: "",
            email: "",
            localErrors: {},
        }
    }


    componentDidMount() {
    }


    resetForm = () => {
        this.setState({
            name: '',
            description: "",
            phone: "",
            email: "",
            localErrors: {},
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
        })
    }

    onSubmit = e => {
        this.setState({
            error: undefined
        });
        this.props.dispatch(middleware("suppliers").postNew({ name: this.state.name, email: this.state.email, phone: this.state.phone, description: this.state.description })).then(result => {
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

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            type: 'smooth'
        });
    }

    render() {
        const { name, phone, email } = this.state.localErrors;
        return (<Aux>
            <CustomCard>
                <FormValidation onSubmit={this.onSubmit} onError={(props) => this.setState({
                    localErrors: props.localErrors,
                    error: props.error
                })}>
                    {this.state.success && <Alert size="sm" variant="success" className="py-2" dismissible onClose={() => this.setState({ success: undefined })}>{this.state.success}</Alert>}
                    {this.state.error && <Alert size="sm" variant="danger" className="py-2" dismissible onClose={() => this.setState({ error: undefined })}>{this.state.error}</Alert>}
                    <FormInput error={name} size="sm" type='text' label="Supplier Name" name='name' value={this.state.name} required onChange={this.handleInput} />
                    <FormInput error={phone} size="sm" type='tel' label="Phone" name='phone' value={this.state.phone} required onChange={this.handleInput} />
                    <FormInput error={email} size="sm" type='email' label="Email" name='email' value={this.state.email} onChange={this.handleInput} />
                    <FormInput as='textarea' rows={5} label="Description" name='description' value={this.state.description} onChange={this.handleInput} />
                    <div className="d-inline float-right">
                        <Button variant="success" size="sm" type="submit" title={this.state.categoryError ? 'Please add category first' : ''}>Save</Button>
                        <Button variant="danger" className="ml-2" size="sm" type="button">Cancel</Button>
                    </div>
                </FormValidation>
            </CustomCard>
        </Aux>);
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.data
    }
}
export default connect(mapStateToProps)(AddCategory);