import React, { Component } from 'react';
import Aux from '../../../constants/hoc/_Aux';
import ServerSideTable from '../../../components/ServerSideTable';

class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Aux>
            <ServerSideTable />
        </Aux>);
    }
}

export default CategoriesList;