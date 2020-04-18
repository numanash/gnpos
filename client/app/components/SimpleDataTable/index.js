import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import ReactTable from "react-table";
import axios from "../../../services/http";
import { Card, Alert, DropdownButton, Dropdown, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from "prop-types";
import FoldableTableHOC from "react-table/lib/hoc/foldableTable";
const FoldableTable = FoldableTableHOC(ReactTable);

class SimpleDataTable extends React.Component {
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

    onView = val => {
        this.props.onView(val);
    }
    componentDidMount() {

        this.fetchData();
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


    fetchData = () => {
        this.setState({ loading: true });
        axios.get(this.props.url).then(result => {

            let data = result.data.map(row => {
                let maindata = row;
                maindata['actions'] = <>
                    <Dropdown className="position-static table_actions" >
                        <Dropdown.Toggle variant="warning" id="dropdown-basic" size="sm">
                            <i className="fa fa-cog"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.props.canView && <Dropdown.Item title="view" onClick={() => this.onView(row)} ><i className="fa fa-eye"></i></Dropdown.Item>}
                            {this.props.canEdit && <Dropdown.Item title="edit" onClick={() => this.onEdit(row)} ><i className="fa fa-edit"></i></Dropdown.Item>}
                            {this.props.canDelete && <Dropdown.Item title="delete" onClick={() => this.onDelete(row)} ><i className="fa fa-trash"></i></Dropdown.Item>}
                            {this.props.extraButtons && this.props.extraButtons.length && this.props.extraButtons.map(button => <Dropdown.Item key={button.title} title={button.title} onClick={() => button.action(row)} ><i className={button.icon}></i></Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </>;
                return maindata;
            });
            this.setState({
                data: data,
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
                <FoldableTable
                    columns={this.props.columns}
                    data={data}
                    loading={loading} // Display the loading overlay when we need it
                    // Request new data when things change
                    className="-striped -highlight"
                    filterable
                    defaultPageSize={5}

                />
                <br />
            </Card>
        );
    }
}


SimpleDataTable.propTypes = {
    url: PropTypes.string,
    coulmns: PropTypes.array,
    extraButtons: PropTypes.array,
    actionId: PropTypes.string
}

export default SimpleDataTable;