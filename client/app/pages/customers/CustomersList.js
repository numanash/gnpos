import React, { Component } from "react";
import moment from "moment";
import Aux from "../../constants/hoc/_Aux";
import ServerSideTable from "../../components/ServerSideTable";
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

  render() {
    return (
      <Aux>
        <ServerSideTable
          actions="true"
          url="customers"
          canEdit="true"
          onEdit={this.handleEdit}
          actionId="id"
          columns={columns}
        />
      </Aux>
    );
  }
}

export default CustomersList;
