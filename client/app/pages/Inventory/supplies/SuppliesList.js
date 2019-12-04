import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';
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
        this.state = {}
    }


    handleProducts = data => {
        this.props.history.push(`/inventory/supply/products/list/${data}`, {
            id: data
        });
    }

    render() {
        return (<Aux>
            <ServerSideTable url="/supplies" columns={columns} actionId="id" canView="true" canEdit="true" canDelete="true" extraButtons={
                [
                    {
                        icon: "fa fa-list-ol",
                        title: "Products",
                        variant: "success",
                        action: this.handleProducts
                    }
                ]
            } />
        </Aux>);
    }
}

export default SuppliesList;