import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import middleware from '../../../../middleware';
import { Card, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import AddProduct from './AddProduct';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: undefined
        }
    }

    componentDidMount() {
        this.props.dispatch(middleware("products").getSingle(this.props.match.params.id)).then(res => {
            this.setState({
                product: res
            })
        }).catch(error => {
            this.setState({
                error: error
            })
        })
    }


    render() {
        return (<Aux>

            {this.state.product ? <AddProduct product={this.state.product[0]} edit={true} /> : <Card>
                <Card.Header>
                    {this.state.error ? <Alert variant="danger">{this.state.error.toString()}</Alert> : "Loading..."}
                </Card.Header>
            </Card>}

        </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        product: state.products.data
    }
}


export default connect(mapStateToProps)(EditProduct);