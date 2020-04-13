import React, { Component } from 'react';

import {connect} from "react-redux";
import middleware from '../../../middleware';
import AddTaxes from './AddTaxes';
import { Alert } from 'react-bootstrap';



class EditTax extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            taxes:[]
        }
    }

    UNSAFE_componentWillMount(){
        this.props.dispatch(middleware("taxes").getSingle(this.props.match.params.id)).then(res=>{
            this.setState({
                taxes:res.data
            })
        }).catch(err=>{
            this.setState({
                error: typeof err === "object" ? JSON.stringify(err) : err
            })
        })
    }
    render() { 
        return ( 
            <>
            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
            {this.state.taxes.length &&
                <AddTaxes edit={true} tax={this.state.taxes[0]} />
            }
            </>
         );
    }
}


const mapStateToProps = state => ({taxes:state.taxes.data})
export default connect(mapStateToProps)(EditTax);