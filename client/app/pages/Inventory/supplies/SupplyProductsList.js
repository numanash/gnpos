import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';
import matchSorter from "match-sorter";

import Moment from "moment";
import SimpleDataTable from '../../../components/SimpleDataTable';
const columns = [
    {
        Header: 'Product Name',
        accessor: 'name',
        sortable: false,
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true
    }, {
        Header: 'Barcode',
        accessor: 'barcode',
        sortable: false,
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["barcode"] }),
        filterAll: true
    }, {
        Header: 'Quantity Before',
        accessor: 'quantity_before',
        sortable: false,
        filterable: false
    }, {
        Header: 'Quantity',
        accessor: 'quantity',
        sortable: false,
        filterable: false
    }, {
        Header: 'Quantity After',
        accessor: 'quantity_after',
        sortable: false,
        filterable: false
    }, {
        Header: 'Unit Price',
        accessor: 'unit_price',
        sortable: false,
        filterable: false
    }, {
        Header: 'Supplier',
        accessor: 'supplier_name',
        sortable: false,
        filterable: false
    }, {
        id: 'createdAt',
        Header: 'Created At',
        accessor: d => {
            return Moment(d.createdAt)
                .local()
                .format("DD/MM/YYYY hh:mm:ss")
        },
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["createdAt"] }),
        filterAll: true,
        width: 200
    }, {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        filterable: false
    },
];
class SuppliesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        console.log(this.props);
    }


    handleProducts = data => {
        console.log(data);
    }

    onEdit = data => {
        this.props.history.push(`/inventory/supply/products/edit/${data}`, {
            id: data
        })
    }




    render() {
        return (<Aux>
            <SimpleDataTable
                onEdit={this.onEdit}
                url={`/supplies/${this.props.match.params.id}`}
                columns={columns}
                actionId="id"
                canEdit="true"
                canDelete="true"
            />
        </Aux>);
    }
}

export default SuppliesList;