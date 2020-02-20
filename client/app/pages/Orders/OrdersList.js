import React, { Component } from 'react';
import Aux from '../../constants/hoc/_Aux';
import ServerSideTable from '../../components/ServerSideTable';
import Salereceipt from '../POS/SalesReceipt';
const columns = [
    {
        Header: 'Order Code',
        accessor: 'code'
    }, {
        Header: 'Payment Type',
        accessor: 'payment_type'
    }, {
        Header: 'Discount Type',
        accessor: 'discount_type'
    }, {
        Header: 'Total',
        accessor: 'total_payable'
    }, {
        Header: 'Payed',
        accessor: 'customer_pay'
    }, {
        Header: 'Status',
        accessor: 'order_status'
    }, {
        Header: 'Return',
        accessor: 'customer_return'
    }, {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        filterable: false
    }

]
class SuppliersList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getReceipt = code => {
        this.setState({
            orderCode: code,
            showReceipt: true
        })

    }

    closeReceipt = () => {
        this.setState({
            showReceipt: false
        });
    };

    completeOrder = orderCode => {
        this.props.history.push({
            pathname: `/pos/${orderCode}`,
            state: {
                orderCode
            }
        })
    }


    render() {
        return (<Aux><div>
            {this.state.showReceipt && <Salereceipt closeReceipt={this.closeReceipt} orderCode={this.state.orderCode} />}
            <ServerSideTable
                url="/orders"
                columns={columns}
                actions="true"
                extraButtons={[
                    { title: "Print Receipt", icon: "fa fa-print", action: this.getReceipt },
                    { title: "Edit Order", icon: "fa fa-pencil", action: this.completeOrder, condition: true, conditionPropertyName: "order_status", conditionPropertyValue: "advance" },
                    { title: "Complete Order", icon: "fa fa-edit", action: this.completeOrder, condition: true, conditionPropertyName: "order_status", conditionPropertyValue: "pending" }
                ]}
                actionId="code"
            />
        </div>
        </Aux>);
    }
}

export default SuppliersList;