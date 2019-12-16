import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import CustomCard from "../../components/CustomCard";
import Aux from "../../constants/hoc/_Aux";
import CustomSelect from "../../components/CustomSelect.js";
import AsyncSelect from "react-select/async";

import axios from "../../../Services/Http";
import { connect } from "react-redux";
import middleware from "../../../middleware";
import "../../../styles/pages/pos.scss";
import LiveSearch from "../../components/LiveSearch";
import PerfectScrollbar from "react-perfect-scrollbar";

class PointOfSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      customers: [],
      products: [],
      categories: [],
      itemsSearched: [],
      productsByCategory: [],
      selectedCustomer: { value: "Walk In Customer" },
      total: 0,
      totalItems: 0,
      selectedCategory: 1,
      overAllCost: 0,
      discount: 0,
      discountType: "payment"
    };
  }
  componentDidMount() {
    this.props.dispatch(middleware("customers").fetchAll());
    this.props.dispatch(middleware("categories").fetchAll());
    this.onCategoryClicked(1);
  }

  componentDidUpdate(prevProps) {
    if (this.props.customers !== prevProps.customers) {
      let customers = this.props.customers.map(customer => ({
        value: customer.id,
        label: customer.name
      }));
      this.setState({
        customers
      });
    }
    if (this.props.categories !== prevProps.categories) {
      let categories = this.props.categories;
      this.setState({
        categories
      });
    }
  }
  onCategoryClicked = e => {
    if (parseInt(e)) {
      axios
        .get(`/products/category/${e}`)
        .then(res => {
          this.setState({
            productsByCategory: res.data
          });
        })
        .catch(err => {
          if (typeof err.data === "string") {
            this.setState({
              productsError: err.data,
              productsByCategory: []
            });
          }
        });
    } else {
      this.setState(
        {
          selectedCategory: parseInt(e.target.getAttribute("data-value"))
        },
        () => {
          axios
            .get(`/products/category/${this.state.selectedCategory}`)
            .then(res => {
              this.setState({
                productsByCategory: res.data
              });
            })
            .catch(err => {
              if (typeof err.data === "string") {
                this.setState({
                  productsError: err.data,
                  productsByCategory: []
                });
              }
            });
        }
      );
    }
  };
  handleSelectedCustomer = e => {
    this.setState({
      selectedCustomer: e
    });
  };
  handleInput = e => {
    this.setState({
      ...this.state,
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleDiscount = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  handleSearch = inputValue => {
    this.setState({
      isLoading: true,
      noProduct: undefined
    });
    if (!inputValue) {
      return inputValue;
    }
    axios
      .get(`/products/find?search=${inputValue}&limit=5`)
      .then(res => {
        let products = res.data.map(product => ({
          ...product,
          id: product.id,
          value: product.name
        }));
        this.setState({ itemsSearched: products });
        return inputValue;
      })
      .catch(err => {
        if (err.status === 404) {
          this.setState({ itemsSearched: [] });
          return inputValue;
        } else {
          this.setState({ itemsSearched: [] });
          return inputValue;
        }
      });
  };

  handleProductChange = arr => {
    if (arr) {
      let products = arr.map(product => {
        return {
          ...product,
          price: parseInt(product.selling_price),
          quantity: 1,
          total: parseInt(product.selling_price) * 1
        };
      });
      let overAllCost = _.sumBy(products, "total"),
        totalItems = _.sumBy(products, "quantity"),
        total = _.sumBy(products, "price");
      this.setState({
        products,
        total,
        overAllCost,
        totalItems,
        validationError: {
          ...this.state.validationError,
          product: undefined
        }
      });
    } else {
      this.setState({
        products: []
      });
    }
  };
  onItemClicked = item => {
    let products = this.state.products;

    if (products.findIndex(p => p.id === item.id) !== -1) {
      products = products.map(p =>
        p.id === item.id
          ? {
              ...p,
              quantity: p.quantity + 1,
              total: (p.quantity + 1) * p.selling_price
            }
          : p
      );
    } else {
      let product = { ...item, quantity: 1, total: 1 * item.selling_price };
      products.push(product);
    }
    let overAllCost = _.sumBy(products, "total"),
      totalItems = _.sumBy(products, "quantity"),
      total = _.sumBy(products, "price");
    this.setState({
      products,
      total,
      overAllCost,
      totalItems
    });
  };

  handleQuantity = e => {
    let products = this.state.products;
    let id = parseInt(e.target.getAttribute("data-val"));
    let product = products[id];
    if (product) {
      let quantity = parseInt(e.target.value) ? parseInt(e.target.value) : 1;
      products[id] = {
        ...product,
        quantity,
        total: parseInt(product.selling_price) * quantity
      };
      let overAllCost = _.sumBy(products, "total");
      let totalItems = _.sumBy(products, "quantity");
      let total = _.sumBy(products, "selling_price");
      this.setState({
        products,
        total,
        overAllCost,
        totalItems
      });
    }
  };

  addToCart = e => {
    let items = this.state.productsByCategory,
      item = items.find(i => i.id === parseInt(e));

    console.log(e);

    if (item) {
      this.setState({ found: false });
      this.onItemClicked(item);
    }
  };

  addDiscount = e => {
    let discountType = this.state.discountType,
      discount = this.state.discount;
    if (discountType === "percentage") {
      let overAllCost = this.state.overAllCost;
      overAllCost -= overAllCost % discount;

      this.setState({
        overAllCost
      });
    } else if (discountType === "payment") {
      this.setState({
        discount
      });
    }
  };

  // handlePrice = e => {

  //     let products = this.state.products;

  //     let product = products[e.target.tabIndex];
  //     if (product) {
  //         products[e.target.tabIndex] = {
  //             ...product,
  //             selling_price: parseInt(e.target.value),
  //             total: parseInt(product.quantity) * parseInt(e.target.value)
  //         }
  //         let overAllCost = _.sumBy(products, 'total');
  //         let totalItems = _.sumBy(products, 'quantity');
  //         let total = _.sumBy(products, 'selling_price');
  //         this.setState({
  //             products,
  //             totalItems,
  //             total,
  //             overAllCost
  //         })

  //     }
  // }

  render() {
    const { products } = this.state;
    return (
      <Aux>
        <div className="point_of_sale">
          <Row>
            <Col sm="12" md="5">
              <CustomCard>
                <CustomSelect
                  placeholder="Select Customer"
                  name="selectedCustomer"
                  options={this.state.customers}
                  onChange={this.handleSelectedCustomer}
                  value={this.state.selectedCustomer}
                />
                {/* <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={this.handleSearch}
                                onChange={this.handleProductChange}
                                onInputChange={this.handleInputChange}
                                value={this.state.selection}
                                placeholder="Search Product"
                            // classNamePrefix={product ? "border-danger" : ""}
                            /> */}

                {/* <Search
                                items={this.state.itemsSearched}
                                placeholder='Search Product by SKU, BarCode and Name '
                                // maxSelected={3}
                                multiple={true}
                                getItemsAsync={this.handleSearch}
                                onItemsChanged={this.handleProductChange}
                            /> */}

                <LiveSearch
                  items={this.state.itemsSearched}
                  placeholder="Search Product by SKU, BarCode and Name"
                  onSearch={this.handleSearch}
                  onItemClicked={this.onItemClicked}
                />
                <div className="pos_product_table">
                  <Table>
                    <thead className="bg-gray-dark">
                      <tr>
                        <th width="30%">Product</th>
                        <th width="15%">Price</th>
                        <th width="20%">Qty</th>
                        <th width="20%">SubTotal</th>
                        <th width="15%">
                          <i className="fa fa-trash"> </i>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="light-gray border-bottom">
                      {products.map((product, index) => {
                        return (
                          <tr
                            name={product.label}
                            id={product.id}
                            key={product.id + "row"}
                          >
                            <td>{product.name}</td>
                            <td>{product.selling_price}</td>
                            <td className="d-inline-flex">
                              <Form.Control
                                as="input"
                                type="number"
                                data-val={index}
                                name={product.name}
                                onChange={this.handleQuantity}
                                tabIndex={index + 3}
                                size="sm"
                                value={products[index]["quantity"]}
                              />
                            </td>
                            <td>Rs. {product.total}</td>
                            <td>
                              <Button
                                size="sm"
                                onClick={this.removeItem}
                                name={product.label}
                                data-val={product.id}
                                variant="danger"
                              >
                                <i
                                  className="fa fa-window-close"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <div className="overAll-detail-bottom">
                  <Table>
                    <thead>
                      <tr>
                        <th className="text-left">Items</th>
                        <th className="font-weight-bold text-right">
                          {this.state.totalItems}
                        </th>
                        <th className="text-left">Total</th>
                        <th className="font-weight-bold text-right" colSpan="2">
                          {this.state.overAllCost}
                        </th>
                      </tr>
                      <tr>
                        <th className="text-left">Tax</th>
                        <th className="font-weight-bold text-right">
                          {this.state.totalItems}
                        </th>
                        <th className="text-left">Discount</th>
                        <th className="font-weight-bold text-right" colSpan="2">
                          <Dropdown>
                            <DropdownButton
                              variant="success"
                              id="dropdown-basic"
                              size="sm"
                              title={<i className="fa fa-edit" />}
                              drop="left"
                            >
                              {/* <Dropdown.Menu> */}
                              <div className="px-2">
                                <Form.Group controlId="discount">
                                  <Form.Label>
                                    Discount Type: {this.state.discountType}
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={this.state.discount}
                                    onChange={this.handleInput}
                                    name="discount"
                                    required
                                    className="mb-2"
                                  />
                                  <Form.Control
                                    as="select"
                                    onChange={this.handleDiscount}
                                    name="discountType"
                                    value={this.state.discountType}
                                  >
                                    <option value="payment">Payment</option>
                                    <option value="percentage">
                                      Percentage
                                    </option>
                                  </Form.Control>
                                </Form.Group>
                                <Dropdown.Item
                                  as="button"
                                  variant="dark"
                                  size="sm"
                                  onClick={this.addDiscount}
                                >
                                  Submit
                                </Dropdown.Item>
                              </div>
                              {/* </Dropdown.Menu> */}
                            </DropdownButton>
                          </Dropdown>
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </div>
              </CustomCard>
            </Col>
            <Col sm="12" md="7">
              <CustomCard>
                <div className="category_bar">
                  <label htmlFor="category_title" title="Tip: Scroll X">
                    Choose Category
                  </label>
                  <PerfectScrollbar>
                    <div
                      className="categories_list d-inline-flex w-100"
                      id="category_title"
                    >
                      {this.state.categories.map(category => (
                        <Button
                          size="sm"
                          data-value={category.id}
                          key={category.id}
                          className={`p-2 mr-1 mb-1 ${
                            this.state.selectedCategory === category.id
                              ? "bg-secondary"
                              : ""
                          }`}
                          onClick={this.onCategoryClicked}
                        >
                          {category.categoryName}
                        </Button>
                      ))}
                    </div>
                  </PerfectScrollbar>
                </div>
                <div className="products_listed">
                  <PerfectScrollbar>
                    <div className="products_scroller h-100 py-2">
                      {this.state.productsByCategory.map(item => {
                        return (
                          <Button
                            key={item.id}
                            variant="light"
                            className="btn-products"
                            onClick={() => this.addToCart(item.id)}
                          >
                            <img src="/img.jpg" />
                            <span>{item.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </PerfectScrollbar>
                </div>
              </CustomCard>
            </Col>
          </Row>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    customers: state.customers.data,
    categories: state.categories.data
  };
};

export default connect(mapStateToProps)(PointOfSale);
