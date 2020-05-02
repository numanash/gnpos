import React, { Component } from "react";
import Aux from "../../../constants/hoc/_Aux";
import ServerSideTable from "../../../components/ServerSideTable";
import moment from "moment";
import axios from "../../../../services/http";
import { Modal } from "react-bootstrap";
import ProductsStockList from "./ProductStockList";
const columns = [
  {
    Header: "Product Name",
    accessor: "name"
  },
  {
    Header: "Barcode",
    sortable: false,
    filterable: false,
    accessor: "barcode"
  },
  {
    Header: "SKU",
    sortable: false,
    filterable: false,
    accessor: "sku"
  },
  {
    Header: "Purchase Price",
    sortable: false,
    filterable: false,
    accessor: "purchase_cost"
  },
  {
    Header: "Selling Price",
    sortable: false,
    filterable: false,
    accessor: "selling_price"
  },
  {
    Header: "Tax",
    sortable: false,
    filterable: false,
    accessor: "tax"
  },
  {
    Header: "Category",
    accessor: "Category.categoryName",
    sortable: false,
    filterable: false
  },
  {
    Header: "Remaining",
    accessor: "quantity_remaining",
    sortable: false,
    filterable: false
  },
  {
    Header: "Status",
    accessor: "product_status",
    sortable: false,
    filterable: false,
    Cell: status => <span className="badge badge-primary">{status.value}</span>
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
  },
  {
    Header: "Actions",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEdit = product => {
    this.props.history.push(`/inventory/product/edit/${product.id}`, {
      id: product.id
    });
  };

  onDelete = product => {
    axios
      .delete(`/products/${product.id}`)
      .then(res => {
        this.setState({
          message: product.name + " " + res.data.message
        });
      })
      .catch(err => {
        //   this.setState({
        //       onError
        //   })
        console.log({ err });
      });
  };

  handleStockModal = e => {
    this.setState(prevState => ({
      showStockModal: !prevState.showStockModal
    }));
  };

  handleStock = product => {
    this.setState({
      productId: product.id,
      showStockModal: true
    });
  };

  render() {
    return (
      <Aux>
        {this.state.showStockModal && (
          <Modal
            size="lg"
            onHide={this.handleStockModal}
            show={this.state.showStockModal}
          >
            <Modal.Body>
              <ProductsStockList id={this.state.productId} />
            </Modal.Body>
          </Modal>
        )}
        <ServerSideTable
          actions="true"
          canEdit="true"
          canDelete="true"
          url="/products"
          columns={columns}
          onMessage={this.state.message}
          actionId="id"
          onEdit={data => this.onEdit(data)}
          onDelete={this.onDelete}
          extraButtons={[
            {
              title: "Product Stock Flow",
              icon: "fa fa-product-hunt",
              action: this.handleStock
            }
          ]}
        />
      </Aux>
    );
  }
}

export default ProductsList;
