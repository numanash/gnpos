import React, { Component } from 'react';
import Aux from '../../constants/hoc/_Aux';
import AddCustomer from './AddCustomer';
import middleware from '../../../middleware';
import { Card, Alert } from 'react-bootstrap';
import { connect } from "react-redux";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: undefined
        }
    }

    componentDidMount() {
        this.props.dispatch(middleware("customers").getSingle(this.props.match.params.id)).then(res => {
            this.setState({
                customer: res
            })
        }).catch(error => {
            this.setState({
                error: error
            })
        })
    }


    render() {
        return (<Aux>

            {this.state.customer ? <AddCustomer customer={this.state.customer[0]} edit={true} /> : <Card>
                <Card.Header>
                    {this.state.error ? <Alert variant="danger">{this.state.error.toString()}</Alert> : "Loading..."}
                </Card.Header>
            </Card>}

        </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customers.data
    }
}


export default connect(mapStateToProps)(EditCustomer);