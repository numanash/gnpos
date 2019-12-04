import React, { Component } from 'react';
import Aux from '../../constants/hoc/_Aux';
import ServerSideTable from '../../components/ServerSideTable';
const columns = [
    {
        Header: 'Supplier Name',
        accessor: 'name'
    }, {
        Header: 'Phone',
        accessor: 'phone'
    }, {
        Header: 'Email',
        accessor: 'email'
    }, {
        Header: 'Description',
        accessor: 'description'
    }
]
class SuppliersList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Aux>
            <ServerSideTable url="/suppliers" columns={columns} />
        </Aux>);
    }
}

export default SuppliersList;