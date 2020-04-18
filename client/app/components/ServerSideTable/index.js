import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import ReactTable from "react-table";
import axios from "../../../services/http";
import { Card, Alert, DropdownButton, Dropdown, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from "prop-types";


class ServerSideTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            // limit: 3,
            offset: 0
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.onMessage !== nextProps.onMessage){
            
            this.setState({
                message: nextProps.onMessage
            })
            this.fetchData({offset:this.state.offset, pageSize: this.state.pageSize, filtered:[]});
        }
    }

    onView = val => {
        this.props.onView(val);
    }

    onDelete = val => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then((willDelete) => {
            if (willDelete.value) {
                this.props.onDelete(val);
            }
        });;
    }

    onEdit = val => {
        this.props.onEdit(val);
    }


    fetchData = (state, instance) => {

        const offset = state.pageSize * (state.page ? state.page : 1 - 1);
        let filterData = state.filtered;
        let params = {};
        if(filterData.length){
            filterData.map(data=>{
                params[data.id] = data.value;
            })
        }
        this.setState({ loading: true, offset, pageSize: state.pageSize });
        let column = 'id', order = 'DESC';
        if (state.sortable && state.sorted.length) {
            column = state.sorted[0].id;
            order = state.sorted[0].desc ? 'DESC' : 'ASC'
        }

        params = {
            ...params,
            limit:state.pageSize,
            offset,
            column,
            order
        }
        axios.get(this.props.url,{
            params
        }).then(result => {
            let pages, arr;
            if (result.data.count) {
                pages = Math.ceil(result.data.count / state.pageSize);
                arr = result.data.rows
            } else {
                pages = Math.ceil(result.data.length / state.pageSize);
                arr = result.data;
            }

            let data = this.props.actions ? arr.map(row => {
                let maindata = row;
                maindata['actions'] = <>
                    <Dropdown className="position-static table_actions " >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                            <i className="fa fa-cog"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.props.canView && <Dropdown.Item title="view" onClick={() => this.onView(row)} ><i className="fa fa-eye"></i></Dropdown.Item>}
                            {this.props.canEdit && <Dropdown.Item title="edit" onClick={() => this.onEdit(row)} ><i className="fa fa-edit"></i></Dropdown.Item>}
                            {this.props.canDelete && <Dropdown.Item title="delete" onClick={() => this.onDelete(row)} ><i className="fa fa-trash"></i></Dropdown.Item>}
                            {this.props.extraButtons && this.props.extraButtons.length && this.props.extraButtons.map(button =>
                                button.condition ?
                                    (maindata[button.conditionPropertyName] === button.conditionPropertyValue &&
                                        <Dropdown.Item key={button.title} title={button.title} onClick={() => button.action(row)} ><i className={button.icon}></i></Dropdown.Item>) :
                                    <Dropdown.Item key={button.title} title={button.title} onClick={() => button.action(row)} ><i className={button.icon}></i></Dropdown.Item>)}

                        </Dropdown.Menu>
                    </Dropdown>




                </>;

                return maindata;
            }) : arr;
            this.setState({
                data: data,
                pages,
                loading: false
            })
        }).catch(err => {
            this.setState({
                data: [],
                error: "Error on server review in console"
            })
        });
    }
    render() {
        const { data, pages, loading } = this.state;
        return (
            <Card>
                {this.state.error && <Alert variant="danger" onClose={() => this.setState({
                    error: undefined
                })}>{this.state.error}</Alert>}
                {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                <ReactTable
                    columns={this.props.columns}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pageSize={this.state.limit}
                    defaultPageSize={5}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
                    className="-striped -highlight"

                />
                <br />
            </Card>
        );
    }
}


ServerSideTable.propTypes = {
    url: PropTypes.string,
    coulmns: PropTypes.array,
    extraButtons: PropTypes.array,
    actionId: PropTypes.string
}

export default ServerSideTable;