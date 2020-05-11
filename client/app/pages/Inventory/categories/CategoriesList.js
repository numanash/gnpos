import React, { Component } from "react";
import Aux from "../../../constants/hoc/_Aux";
import ServerSideTable from "../../../components/ServerSideTable";
import axios from "../../../../services/http";
const columns = [
  {
    Header: "Category Name",
    accessor: "categoryName"
  },
  {
    Header: "Description",
    accessor: "categoryDescription"
  },
  {
    Header: "Actions",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];
class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onViewCategory = data => {
    this.props.history.push({
      pathname: `/inventory/category/edit/${data.id}`,
      id: data.id
    });
  };
  onDeleteCategory = data => {
    axios
      .delete(`/categories/${data.id}`)
      .then(res => {
        this.setState({
          message: data.categoryName + " " + res.data.message
        });
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong"
        });
      });
  };
  render() {
    return (
      <Aux>
        <ServerSideTable
          actions="true"
          canView="true"
          canEdit="true"
          canDelete="true"
          url="/categories"
          columns={columns}
          onView={data => this.onViewCategory(data)}
          onEdit={data => this.onViewCategory(data)}
          onDelete={data => this.onDeleteCategory(data)}
          onMessage={this.state.message}
        />
      </Aux>
    );
  }
}

export default CategoriesList;
