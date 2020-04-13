import React, { Component } from 'react';
import Aux from '../../constants/hoc/_Aux';
import ServerSideTable from '../../components/ServerSideTable';
import axios from '../../../Services/Http';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const columns = [
    {
        Header: 'Tax Name',
        accessor: 'name'
    }, {
        Header: 'Value',
        accessor: 'value',
        filterable:false
    }, {
        Header: 'Type',
        accessor: 'type',
        filterable:false
    }, {
        Header: 'Description',
        accessor: 'description',
        filterable:false
    },{
        Header: 'Actions',
        accessor: 'actions',
        filterable:false,
        sortable:false
    },
]
class TaxesList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onEdit = id=>{
        this.props.history.push({
            pathname:`/tax/edit/${id}`,
            params:{
                id
            }
        })
    }
    
    onDelete= id =>{
        this.setState({
            message:undefined
        })
        axios.delete(`/taxes/${id}`).then(res=>{
            this.setState({
                message: res.data.message
            })

        }).catch(err=>{
            console.log({
                err
            })
        })
    }

    render() {
        return (<Aux>
            <ServerSideTable
                 url="/taxes" 
                 columns={columns} 
                 actionId="id"
                 canEdit={true}
                 canDelete={true}
                 actions={true}
                 onEdit={this.onEdit}
                 onDelete={this.onDelete}     
                 onMessage={this.state.message}
            />
        </Aux>);
    }
}

export default TaxesList;