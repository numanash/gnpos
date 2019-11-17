import React from "react";
import { render } from "react-dom";
import _ from "lodash";

// Import React Table
import ReactTable from "react-table";
import axios from "../../../services/http";
import { Card, Alert } from "react-bootstrap";



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
    fetchData = (state, instance) => {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        console.log({ state });
        const offset = state.pageSize * (state.page ? state.page : 1 - 1);
        this.setState({ loading: true });
        let column = 'id', order = 'ASC';
        if (state.sortable && state.sorted.length) {
            column = state.sorted[0].id;
            order = state.sorted[0].desc ? 'DESC' : 'ASC'
        }
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        axios.get(`/categories?limit=${state.pageSize}&offset=${offset}&column=${column}&order=${order}`).then(result => {
            let pages = Math.ceil(result.data.count / state.pageSize);
            this.setState({
                data: result.data.rows,
                pages,
                loading: false
            })
        }).catch(err => {
            console.log({ err });
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
                <ReactTable
                    columns={[
                        {
                            Header: "Name",
                            accessor: "categoryName"
                        },
                        {
                            Header: "Description",
                            id: "categoryDescription"
                        }
                    ]}
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

export default ServerSideTable;