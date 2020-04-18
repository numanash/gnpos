import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';
const columns = [
    {
        Header: 'Product Name',
        accessor: 'name',
    }, {
        Header: 'Barcode',
        accessor: 'barcode',
    }, {
        Header: 'SKU',
        accessor: 'sku',
    }, {
        Header: 'Purchase Price',
        accessor: 'purchase_cost'
    }, {
        Header: 'Selling Price',
        accessor: 'selling_price'
    }, {
        Header: 'Price',
        accessor: 'purchase_cost'
    }, {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        filterable: false
    }
]
class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onEdit = product => {
        this.props.history.push(`/inventory/product/edit/${product.id}`, {
            id:product.id
        })
    }


    render() {
        return (<Aux>
            <ServerSideTable
                actions="true"
                canEdit="true"
                url="/products"
                columns={columns}
                actionId="id"
                onEdit={(data) => this.onEdit(data)}
            />
        </Aux>);
    }
}

export default ProductsList;