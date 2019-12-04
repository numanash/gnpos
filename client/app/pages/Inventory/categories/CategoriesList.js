import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';
const columns = [
    {
        Header: 'Category Name',
        accessor: 'categoryName'
    }, {
        Header: 'Description',
        accessor: 'categoryDescription'
    }, {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        filterable: false
    }
]
class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onViewCategory = data => {

    }


    render() {
        return (<Aux>
            <ServerSideTable
                actions="true"
                canView="true"
                url="/categories"
                columns={columns}
                onView={(data) => this.onViewCategory(data)}
            />
        </Aux>);
    }
}

export default CategoriesList;