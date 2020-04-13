import React, { Component } from 'react'
import {Card, Form, Col, Row, Button, Alert} from "react-bootstrap"
import { connect } from "react-redux"
import CustomCard from '../../components/CustomCard';
import FormInput from '../../components/FormInput/Index';
import FormValidation from '../../components/FormValidation';
import middleware from '../../../middleware';


class AddTaxes extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            type:"Cash",
            value:0,
            description:"",
            localErrors:{}
         }
    }
    componentDidMount(){
        if(this.props.edit){
                this.setState({
                    ...this.props.tax
                })
        }
    }
    
    handleInput = e=>{
        this.setState({
            ...this.state,
            localErrors:{
                ...this.state.localErrors,
                [e.target.name]:undefined
            },
            [e.target.name]:e.target.value
        })
    }



    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            type: 'smooth'
        });
    }

    resetForm = e=>{
        this.setState({
            name:"",
            type:"Cash",
            value:0,
            description:"",
            localErrors:{}
        })
    }
    onUpdate = e=>{
        this.setState({
            success:undefined
        })
        this.props.dispatch(middleware(`taxes/${this.state.id}`).update({ name: this.state.name, value: this.state.value, type: this.state.type, description:this.state.description })).then(result => {
            this.setState({
                success: result.message,
                // taxes: result.taxes
            }, () => {
                // this.resetForm();
                this.scrollToTop()
            })
        }).catch(error => {
            this.setState({
                error: typeof error.message === "object" ? JSON.stringify(error.message) : error.message
            }, () => {
                this.scrollToTop()
            })
        }) 
    }

    onSubmit=e=>{
        this.setState({
            success:undefined
        })
        this.props.dispatch(middleware("taxes").postNew({ name: this.state.name, value: this.state.value, type: this.state.type, description:this.state.description })).then(result => {
            this.setState({
                success: result.message,
                taxes: result.taxes
            }, () => {
                this.resetForm();
                this.scrollToTop()
            })
        }).catch(error => {
            this.setState({
                error: typeof error.message === "object" ? JSON.stringify(error.message) : error.message
            }, () => {
                this.scrollToTop()
            })
        }) 
    }


    render() { 
        const {name,value}=this.state.localErrors;
        return ( 
            <>
                <CustomCard title="Add Tax">
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    {this.state.success && <Alert variant="success">{this.state.success}</Alert>}

                    <FormValidation onSubmit={this.props.edit ? this.onUpdate : this.onSubmit} onError={(e)=>{this.scrollToTop(); this.setState({...this.state,localErrors:e.localErrors,error:e.error})}}>
                        <Row>
                            <Col md="6">
                                <Form.Group controlId="name">
                                    <FormInput error={name} required type="text" label="Tax Name" value={this.state.name} name="name" onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col md="6">        
                                <Form.Group controlId="value">
                                    <FormInput required min="1" error={value} type="number" label="Tax Value" value={this.state.value} name="value" onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col md="6">        
                                <Form.Group controlId="type">
                                    <Form.Label>
                                        Select Tax Type
                                    </Form.Label>
                                    <select className="form-control" onChange={this.handleInput} name="type" defaultValue={this.state.type}>
                                        <option value="Cash">Cash</option>
                                        <option value="Percentage">Percentage</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md="12">        
                                <Form.Group controlId="description">
                                    <FormInput label="Description" as="textarea" rows="5" value={this.state.description} name="description" onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-right">
                            <Button type="submit">{!this.props.edit ? "Add" : "Update"} Tax</Button>
                        </div>
                    </FormValidation>
                </CustomCard>
            </>
         );
    }
}
 
const mapStateToProps = (state) => {
    return {
        taxes: state.taxes.data
    }
}
export default connect(mapStateToProps)(AddTaxes);