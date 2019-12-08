import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from '../../../../Services/Http';
import Print from '../../../components/Print';
import moment from 'moment';
const columns = [
    {
        Header: 'Supply Name',
        accessor: 'name',
        filterable: false
    }, {
        Header: 'Items',
        accessor: 'items',
        filterable: false
    }, {
        Header: 'Value(Rs)',
        accessor: 'value',
        filterable: false
    }, {
        Header: 'Provider',
        accessor: 'provider',
        sortable: false,
        filterable: false
    }, {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        filterable: false
    }
];
class SuppliesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printInvoice: false,
            totalItems: 0,
            total: 0,
            totalUnitsPrice: 0,
            supplies: []
        }
    }


    handleProducts = data => {
        this.props.history.push(`/inventory/supply/products/list/${data}`, {
            id: data
        });
    }
    onEdit = id => {
        this.props.history.push(`/inventory/supply/edit/${id}`, {
            id
        })
    }

    printSupplyInvoice = e => {
        Print({
            divId: "invoice_table",
            title: "Supply Inovice",
            printStyle: `*{
                        font-family: Verdana, Geneva, sans-serif;
                        text-transform: uppercase;
                        }
                        td, th {font-size: 1.5vw;}
                        p {
                        font-size: 1.5vw;
                            font-weight: 800;
                        }
                        h1 {
                        font-size:3vw;
                            font-weight: 800;
                        }
                        h3 {
                        font-size: 2.5vw;
                            font-weight: 800;
                        }
                        h4 {
                        font-size: 2vw;
                            font-weight: 800;
                        }
                        .modal-content{
                        border:none;
                        margin:10px auto;
                        }`
        })
    }
    handleInvoice = id => {
        axios.get(`/supplies/${id}`).then(result => {

            let supplies = result.data;

            let total = _.sumBy(supplies, 'total_price'),
                totalItems = _.sumBy(supplies, 'quantity'),
                totalUnitsPrice = _.sumBy(supplies, 'unit_price');


            this.setState({
                printInvoice: true,
                supplies,
                totalItems,
                total,
                totalUnitsPrice
            })
        }).catch(error => {
            this.setState({
                error: "Something went wrong. Review in console."
            })
        })

    }
    closeInvoice = e => { this.setState((prevState) => ({ printInvoice: !prevState.printInvoice })) }

    render() {
        return (<Aux>

            <Modal show={this.state.printInvoice} onHide={this.closeInvoice} size="lg" id="invoice_table">

                <Modal.Header className="bg-gray-light">
                    <Modal.Title>Supply Inovice</Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Supplier</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplies.map(supply => (
                                <tr key={supply.name}>
                                    <td>{supply.name}</td>
                                    <td>{supply.supplier_name}</td>
                                    <td>Rs. {supply.unit_price}</td>
                                    <td>{supply.quantity}</td>
                                    <td>Rs. {supply.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-light">
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>Rs. {this.state.totalUnitsPrice}</td>
                                <td>{this.state.totalItems}</td>
                                <td>Rs. {this.state.total}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Modal.Body>
                <Modal.Footer className="d-print-none">

                    <Button onClick={this.printSupplyInvoice}>Print</Button>
                    <Button onClick={this.closeInvoice} variant="danger">Cancel</Button>
                </Modal.Footer>
            </Modal>

            <ServerSideTable
                url="/supplies"
                actions="true"
                columns={columns}
                actionId="id"
                canEdit="true"
                canDelete="true"
                onEdit={this.onEdit}
                extraButtons={
                    [
                        {
                            icon: "fa fa-list-ol",
                            title: "Products",
                            variant: "primary",
                            action: this.handleProducts
                        }, {
                            icon: "fa fa-file",
                            title: "Invoice",
                            variant: "secondary",
                            action: this.handleInvoice
                        }
                    ]
                } />
        </Aux>);
    }
}

export default SuppliesList;