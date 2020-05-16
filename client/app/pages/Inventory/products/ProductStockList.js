import React, { Component } from "react";
import Aux from "../../../constants/hoc/_Aux";
import ServerSideTable from "../../../components/ServerSideTable";
import moment from "moment";
import axios from "../../../../services/http";
const columns = [
  {
    Header: "Product Code",
    accessor: "ref_product_code",
    sortable: false,
    filterable: false
  },
  {
    Header: "Quantity Before",
    accessor: "quantity_before"
  },
  {
    Header: "Quantity(Added/Removed)",
    accessor: "quantity",
    Cell: options =>
      options.original.type === "supply" ? (
        <>
          <span className="text-success font-weight-bold">+</span>{" "}
          {options.value}
        </>
      ) : (
        <>
          <span className="text-danger font-weight-bold">-</span>{" "}
          {options.value}
        </>
      )
  },
  {
    Header: "Quantity After",
    accessor: "quantity_after"
  },
  {
    Header: "Type Stock",
    accessor: "type"
  },
  {
    Header: "Created",
    accessor: "createdAt",
    sortable: false,
    filterable: false,
    Cell: option => (
      <span className="badge badge-primary">
        {moment(option.value).format("YYYY-MM-DD HH:mm")}
      </span>
    )
  }
];
class ProductsStockList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Aux>
        <ServerSideTable
          url={`/products/stock/${this.props.id}`}
          columns={columns}
        />
      </Aux>
    );
  }
}

export default ProductsStockList;
