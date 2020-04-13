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
    DropdownButton,
    Alert
} from "react-bootstrap";
import CustomCard from "../../components/CustomCard";
import Aux from "../../constants/hoc/_Aux";
import CustomSelect from "../../components/CustomSelect.js";
import axios from "../../../Services/Http";
import { connect } from "react-redux";
import middleware from "../../../middleware";
import "../../../styles/pages/pos.scss";
import LiveSearch from "../../components/LiveSearch";
import PerfectScrollbar from "react-perfect-scrollbar";
import { percentage } from "../../constants/functions";
import Checkout from "./Checkout";
import SalesReceipt from "./SalesReceipt";
import {Link} from "react-router-dom";
let productToBeRemoved = [];
// import { getDevices } from 'usb-barcode-scanner';
import SweetAlert from 'sweetalert2-react';


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
            selectedCustomer: { value: 1, label: "Walk In Customer" },
            total: 0,
            totalItems: 0,
            payment_type: "Cash",
            selectedCategory: 1,
            overAllCost: 0,
            discount: 0,
            discount_in_cash:0,
            discount_percent:0,
            order_status: "completed",
            subTotal: 0,
            discount_type: "payment",
            customer_pay: 0,
            customer_change: 0,
            isLoading: true
        };
    }
    componentDidMount() {
        // console.log(getDevices());

        this.setState({
            isLoading:true
        })
        this.props.dispatch(middleware("customers").fetchAll());
        this.props.dispatch(middleware("categories").fetchAll());
        this.onCategoryClicked(1);
        if (this.props.match.params.orderCode) {
            axios.get(`/orders/pending/${this.props.match.params.orderCode}`).then(res => {
                let products = res.data.oi.map(product => ({
                    ...product,
                    total: parseInt(product.selling_price) * product.quantity
                }))
                const order = res.data;
                this.setState({
                    products,
                    subTotal:res.data.discount_in_cash + res.data.total_payable,
                    overAllCost: res.data.total_payable,
                    ...order,
                    update: true
                })
            }).catch(err=>{ 
                if(err.status === 404){
                    this.props.history.push({
                        pathname:"/orders",
                        params:{
                            notFound:true
                        }
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.customers !== prevProps.customers) {
            let customers = this.props.customers.map(customer => ({
                value: customer.id,
                label: customer.name
            }));
            this.setState({
                customers,
                isLoading:false
            });
        }
        if (this.props.categories !== prevProps.categories) {
            let categories = this.props.categories;
            this.setState({
                categories,
                isLoading:false
            });
        }
    }

    resetOrder = e=>{
        this.setState({
            inputValue: "",
            products: [],
            itemsSearched: [],
            discount: 0,
            discount_in_cash:0,
            discount_percent:0,
            // productsByCategory: [],
            selectedCustomer: { value: 1, label: "Walk In Customer" },
            total: 0,
            totalItems: 0,
            payment_type: "Cash",
            selectedCategory: 1,
            overAllCost: 0,
            discount: 0,
            order_status: "completed",
            subTotal: 0,
            discount_type: "payment",
            customer_pay: 0,
            customer_change: 0,
            isLoading: true
        })
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
        if (e.target.name === "discount") {

            if (this.state.discount_type === "percentage") {
                if (parseInt(e.target.value) < 100 && this.state.subTotal >= 0) {
                    this.setState({
                        ...this.state,
                        [e.target.name]: parseInt(e.target.value)
                    })
                }
            } else if (this.state.discount_type === "payment") {
                if (this.state.subTotal > parseInt(e.target.value)) {
                    this.setState({
                        ...this.state,
                        [e.target.name]: parseInt(e.target.value)
                    })
                }
            }
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: parseInt(e.target.value)
            });
        }
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
            total = _.sumBy(products, "price"),
            subTotal = _.sumBy(products, "total");
        if (this.state.discount) {
            this.state.discount_type === "percentage" ?
                overAllCost = subTotal - percentage(subTotal, this.state.discount)
                :
                overAllCost = subTotal - this.state.discount
        }
        this.setState({
            products,
            total,
            overAllCost,
            subTotal,
            totalItems
        });
    };

    removeItem = e => {
        let productId = e.target.getAttribute("data-val");
        if (productId) {
            let products = _.reject(this.state.products, (product) => product.id === parseInt(productId));
            let overAllCost = _.sumBy(products, "total"),
                totalItems = _.sumBy(products, "quantity"),
                total = _.sumBy(products, "price"),
                subTotal = _.sumBy(products, "total");

            if (this.state.discount) {
                this.state.discount_type === "percentage" ?
                    overAllCost = subTotal - percentage(subTotal, this.state.discount)
                    :
                    overAllCost = subTotal - this.state.discount
            }

            productToBeRemoved.push(productId);
            productToBeRemoved = _.uniqBy(productToBeRemoved);

            this.setState({
                products,
                total,
                overAllCost,
                subTotal,
                productToBeRemoved,
                totalItems
            });

        }
    }

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

            let overAllCost = _.sumBy(products, "total"),
                totalItems = _.sumBy(products, "quantity"),
                total = _.sumBy(products, "price"),
                subTotal = _.sumBy(products, "total");
            if (this.state.discount) {
                this.state.discount_type === "percentage" ?
                    overAllCost = subTotal - percentage(subTotal, this.state.discount)
                    :
                    overAllCost = subTotal - this.state.discount
            }
            this.setState({
                products,
                total,
                overAllCost,
                totalItems,
                subTotal
            });
        }
    };

    addToCart = e => {
        let items = this.state.productsByCategory,
            item = items.find(i => i.id === parseInt(e));

        if (item) {
            this.setState({ found: false });
            this.onItemClicked(item);
        }
    };

    //Discount Handle
    
    handleDiscount = e => {

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });

    };


    addDiscount = e => {

        let discount_type = this.state.discount_type,
            discount = this.state.discount,
            overAllCost = this.state.overAllCost,
            subTotal = this.state.subTotal,
            discount_in_cash= this.state.discount_in_cash,
            discount_percent=this.state.discount_percent;

        if (discount_type === "percentage") {
            overAllCost = subTotal - percentage(subTotal, discount);
            discount_in_cash=percentage(subTotal, discount);
            discount_percent= discount;
            this.setState({
                overAllCost,
                discount_in_cash,
                discount_percent
            });
        } else if (discount_type === "payment") {
            overAllCost = subTotal - discount;
            discount_in_cash = discount;
            discount_percent = 0;
            this.setState({
                discount,
                discount_percent,
                overAllCost,
                discount_in_cash
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

    onAddOrder = e => {
        this.setState({
            checkOut: true
        })
        // let products = this.state.products;
        // let data = {
        //     orderName: '',
        //     orderCode:'',
        //     selectedCustomer:this.state.selectedCustomer,
        //     payment_type: 'cash',
        //     total_received:''
        // }
        // axios.post(`/api/orders/place-order`,{products,}).then(res => {
        //     console.log({ res })
        // }).catch(err => {
        //     console.log({ err });
        // })
    }

    handleCustomerPay = e => {
        let value = parseInt(e.target.value);
        if (value) {
            this.setState(prevState => ({
                customer_pay: value,
                amountError:undefined,
                customer_change: value > prevState.overAllCost ? parseInt(value - prevState.overAllCost) : 0,
                customer_remaning: value < prevState.overAllCost ? parseInt(prevState.overAllCost - value) : 0
            }))
        }
    }

    submitPayNow = e => {

        if(this.state.customer_pay < this.state.overAllCost){
            return this.setState({
                amountError: "Please pay full amount"
            })
        }
        if(!this.state.customers.length){
            this.setState({
                error:"Customers not found."
            })
        }
        
        if (this.state.update) {
            if(this.state.customer_pay < this.state.overAllCost){
                return this.setState({
                    amountError: "Please pay full amount"
                })
            }
            let data = {
                title: this.state.orderName,
                code: this.state.code,
                ref_client: this.state.selectedCustomer.value,
                payment_type: "Cash",
                discount_in_cash: this.state.discount_in_cash,
                discount_type: this.state.discount_type,
                discount_percent: this.state.discount_percent,
                total_payable: this.state.overAllCost,
                total_items: this.state.totalItems,
                description: this.state.orderNote,
                order_status: "completed",
                total_received: this.state.customer_pay,
                customer_pay: this.state.customer_pay,
                customer_return: this.state.customer_change,
                deletedItem: productToBeRemoved
            };
            axios.put(`/orders/update/${this.props.match.params.orderCode}`, { ...data, products: this.state.products }).then(result => {

                this.setState({
                    orderCode: result.data.orders,
                    checkOut: false
                })
                this.resetOrder();
                this.props.history.push("/orders")
            }).catch(err => {
                console.log({ err });
            })
            return;
        }
        let data = {
            title: this.state.orderName,
            ref_client: this.state.selectedCustomer.value,
            payment_type: this.state.payment_type,
            discount_in_cash: this.state.discount_in_cash,
            discount_type: this.state.discount_type,
            discount_percent: this.state.discount_percent,
            total_payable: this.state.overAllCost,
            total_items: this.state.totalItems,
            description: this.state.orderNote,
            order_status: this.state.order_status,
            total_received: this.state.customer_pay,
            customer_pay: this.state.customer_pay,
            customer_return: this.state.customer_change
        }

        axios.post("/orders/place-order", { ...data, products: this.state.products }).then(result => {
            this.setState({
                orderCode: result.data.orders,
                success:"Order has been placed order code is " + result.data.orders,
                checkOut: false
            })
            this.resetOrder();
        }).catch(err => {
            console.log({ err });
        })
    }

    closeReceipt = e => {
        this.setState({
            orderCode: undefined
        })
    }
    

    advanceOrder = e => {
        this.setState({
            error:undefined,
            order_status: "advance",
            payment_type: "pending",
        }, () => {
            this.submitPayNow();
        })
    }

    saveOrderNow = e => {
        this.setState({
            order_status: "pending",
            payment_type: "pending",
            total_received: 0,
            customer_pay: 0,
            error:undefined,
            customer_return: 0
        }, () => {
            this.submitPayNow();
        })
    }

    render() {
        const { products } = this.state;
        const selectedCustomer = this.state.customers.length ?  this.state.selectedCustomer : {value:0,label:"Customer Not Found"};
        return (
            <Aux>
                {this.state.success && <SweetAlert
        show={this.state.success}
        title="Success"
        text={this.state.success}
        onConfirm={() => this.setState({ success: false })}
      />}
                <div className="point_of_sale">
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    {this.state.orderCode && <SalesReceipt
                        orderCode={this.state.orderCode}
                        closeReceipt={this.closeReceipt}
                    />}
                    {this.state.checkOut &&
                        <Checkout
                            advanceOrder={this.advanceOrder}
                            error={this.state.amountError}
                            hideModal={() => this.setState({
                                checkOut: false
                            })}
                            showModal={this.state.checkOut}
                            orderDetails={{
                                totalItems: this.state.totalItems,
                                overAllCost: this.state.overAllCost,
                                subTotal: this.state.subTotal,
                                customer_pay: this.state.customer_pay,
                                customer_change: this.state.customer_change
                            }}
                            saveOrderNow={this.saveOrderNow}
                            handleCustomerPay={this.handleCustomerPay}
                            submitPayNow={this.submitPayNow}
                            update={this.state.update}
                        />}
                        {this.state.customers.length === 0 && !this.state.isLoading && <Alert variant="danger">Please add customer first. <Link to="/customer/add">Click Here</Link></Alert>}

                    <Row>
                        <Col sm="12" md="5">
                            <CustomCard>
                                <CustomSelect
                                    placeholder="Select Customer"
                                    name="selectedCustomer"
                                    options={this.state.customers}
                                    onChange={this.handleSelectedCustomer}
                                    value={selectedCustomer}
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



                                <PerfectScrollbar>
                                    <div className="pos_product_table">
                                        <Table className="mb-0">
                                            <thead className="bg-gray-dark text-center">
                                                <tr>
                                                    <th width="30%">Product</th>
                                                    <th width="15%">Price</th>
                                                    <th width="25%">Qty</th>
                                                    <th width="25%">SubTotal</th>
                                                    <th width="5%">
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
                                                            <td >{product.name}</td>
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
                                                                    style={{ fontSize: "10px" }}
                                                                >
                                                                    <i
                                                                        onClick={this.removeItem}
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
                                </PerfectScrollbar>
                                <div className="overAll-detail-bottom">
                                    <Table className="mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Items</th>
                                                <th className="font-weight-bold text-right">
                                                    {this.state.totalItems}
                                                </th>
                                                <th className="text-left">Sub Total:</th>
                                                <th className="font-weight-bold text-right" colSpan="2">
                                                    {this.state.subTotal}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="text-left border-0">Tax</th>
                                                <th className="font-weight-bold text-right border-0">
                                                    {this.state.totalItems}
                                                </th>
                                                <th className="text-left border-0">Discount</th>
                                                <th className="font-weight-bold text-right d-flex justify-content-end border-0" colSpan="2">
                                                    <span>{this.state.discount_type === "percentage" ? `${this.state.discount_percent} %` : `Rs. ${this.state.discount_in_cash}`}</span>&nbsp;&nbsp;
                                                        <Dropdown>
                                                        <DropdownButton
                                                            variant="success"
                                                            id="dropdown-basic"
                                                            size="sm"
                                                            title={<i className="fa fa-edit" />}
                                                            drop="up"
                                                        >
                                                            {/* <Dropdown.Menu> */}
                                                            <div className="px-2">
                                                                <Form.Group controlId="discount">
                                                                    <Form.Label>
                                                                        Discount Type: {this.state.discount_type}
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
                                                                        name="discount_type"
                                                                        value={this.state.discount_type}
                                                                    >
                                                                        <option value="payment">Payment</option>
                                                                        <option value="percentage">
                                                                            Percentage
                                        </option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                                <Dropdown.Item
                                                                    as="button"
                                                                    size="sm"
                                                                    className="btn bg-dark text-center"
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
                                            <tr>
                                                <th colSpan="3">Total</th>
                                                <th colSpan="2" className="text-right">{this.state.overAllCost}</th>
                                            </tr>
                                        </thead>
                                    </Table>
                                </div>
                                <div className="pos_actions text-right mt-2">
                                    <Button variant="success" onClick={this.onAddOrder}>Order</Button>
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
                                                        className="btn-products mr-1"
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
