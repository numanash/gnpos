import React, { Component } from "react";
import moment from "moment";
import Aux from "../../constants/hoc/_Aux";
import ServerSideTable from "../../components/ServerSideTable";
import axios from "../../../services/Http";
import { Alert } from "react-bootstrap";
const columns = [
  {
    Header: "Customer Name",
    accessor: "name",
    sortable: false,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["name"] }),
    filterAll: true
  },
  {
    Header: "Email",
    accessor: "email",
    sortable: false,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["email"] }),
    filterAll: true
  },
  {
    Header: "Phone",
    accessor: "phone",
    sortable: false,
    filterAll: true
  },
  {
    Header: "Address",
    accessor: "address",
    sortable: false,
    filterAll: true
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    sortable: false,
    filterAll: true,
    Cell: option => (
      <span className="badge badge-primary">
        {moment(option.value).format("YYYY-MM-DD HH:mm")}
      </span>
    )
  },
  {
    Header: "Actions",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];
class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleEdit = customer => {
    this.props.history.push(`/customer/edit/${customer.id}`, {
      id: customer.id
    });
  };
  handleDelete = customer => {
    axios
      .delete(`/customers/${customer.id}`)
      .then(res => {
        this.setState({
          message: `${customer.name} ${res.data.message}`
        });
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        });
      });
  };
  render() {
    return (
      <Aux>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <ServerSideTable
          actions="true"
          url="customers"
          canEdit="true"
          canDelete="true"
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          actionId="id"
          onMessage={this.state.message}
          columns={columns}
        />
      </Aux>
    );
  }
}

export default CustomersList;
