import React, { Component } from "react";

import moment from "moment";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import Print from "../../components/utils/Print";
import axios from "axios";

class Salereceipt extends Component {
    state = {
        orderDetailss: undefined
    };

    UNSAFE_componentWillMount() {
        axios.get(`/reports/receipt/${this.props.orderCode}`).then(res => {
            let orderDetails = res.data[0];
            if (orderDetails) {
                if (orderDetails.quantity.includes(",")) {
                    const quantity = orderDetails.quantity.split(",");
                    const pName = orderDetails.pName.split(",");
                    const price = orderDetails.price.split(",");
                    const iPrice = orderDetails.iPrice.split(",");
                    orderDetails = { ...orderDetails, quantity, pName, price, iPrice };
                    this.setState({
                        orderDetails
                    });
                } else {
                    this.setState({
                        orderDetails
                    });
                }
            } else {
                this.setState({
                    orderDetails
                });
            }
            if (this.props.autoPrint) {
                setTimeout(() => {
                    this.printReceipt();
                }, 1000);
            }
        }).catch(err => {
            console.log({ err });
        })

    }

    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.orderCode !== props.orderCode) {
            axios.get(`/reports/receipt/${this.props.orderCode}`).then(res => {
                let orderDetails = res.data[0];
                if (orderDetails) {
                    if (orderDetails.quantity.includes(",")) {
                        const quantity = orderDetails.quantity.split(",");
                        const pName = orderDetails.pName.split(",");
                        const price = orderDetails.price.split(",");
                        const iPrice = orderDetails.iPrice.split(",");
                        orderDetails = { ...orderDetails, quantity, pName, price, iPrice };
                        this.setState({
                            orderDetails
                        });
                    } else {
                        this.setState({
                            orderDetails
                        });
                    }
                } else {
                    this.setState({
                        orderDetails
                    });
                }
                if (this.props.autoPrint) {
                    setTimeout(() => {
                        this.printReceipt();
                    }, 1000);
                }
            }).catch(err => {
                console.log({ err });
            })

        }

        // if (props.reports.items) {
        //     if (this.props.reports.items !== props.reports.items) {
        //         let orderDetails = props.reports.items[0];
        //         if (orderDetails) {
        //             if (orderDetails.quantity.includes(",")) {
        //                 const quantity = orderDetails.quantity.split(",");
        //                 const pName = orderDetails.pName.split(",");
        //                 const price = orderDetails.price.split(",");
        //                 const iPrice = orderDetails.iPrice.split(",");
        //                 orderDetails = { ...orderDetails, quantity, pName, price, iPrice };
        //                 this.setState({
        //                     orderDetails
        //                 });
        //             } else {
        //                 this.setState({
        //                     orderDetails
        //                 });
        //             }
        //         } else {
        //             this.setState({
        //                 orderDetails
        //             });
        //         }
        //         if (this.props.autoPrint) {
        //             setTimeout(() => {
        //                 this.printReceipt();
        //             }, 1000);
        //         }
        //     }
        // }
    }

    printReceipt = () => {
        Print({
            divId: "sale-receipt",
            // bodyM: "0px 40px",
            title: `Order No: ${this.props.orderCode}`,
            printStyle: `
    *{
      font-family: Verdana, Geneva, sans-serif;
      text-transform: uppercase;
    }
    td, th {font-size: 3.5vw;}
    p {
      font-size: 3vw;
          font-weight: 800;
    }
    h1 {
      font-size: 7vw;
          font-weight: 800;
    }
    h3 {
      font-size: 3.5vw;
          font-weight: 800;
    }
    h4 {
      font-size: 3.5vw;
          font-weight: 800;
    }
    .order-details{
      margin-top:30px;
      height: max-content;
    }
    `
        });
    };
    render() {
        const { orderDetails } = this.state;
        if (orderDetails) {
            return (
                <div id="sale-receipt">
                    <div className="order-detail-popup">
                        <div className="order-details container">
                            <button
                                onClick={this.printReceipt}
                                className={`btn btn-primary float-right d-print-none`}
                            >
                                <span className="fa fa-print" />
                            </button>
                            <button
                                className="btn btn-danger close_button d-print-none"
                                onClick={this.props.closeReceipt}
                            >
                                X
                                </button>

                            <h1 className="text-center">GN POS</h1>

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <p>Customer: {orderDetails.cName}</p>
                                    <p>Order No: {this.props.orderCode}</p>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <p className="text-right">Cashier: Admin</p>
                                    <p className="text-right">
                                        Date: {moment(orderDetails.createdAt).format(
                                            "DD-MM-YYYY HH:mm:ss"
                                        )}
                                    </p>
                                </div>
                                <div className="text-center col-md-12">
                                    <h3>Sales Receipt</h3>
                                </div>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-left">ITEMS</th>
                                        <th className="text-right">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orderDetails.quantity) ? (
                                        orderDetails.quantity.map((val, i) => {
                                            return (
                                                <tr key={i + val}>
                                                    <td>
                                                        {orderDetails.pName[i]} <br />
                                                        Rs. {parseInt(orderDetails.iPrice[i])} X {val}
                                                    </td>
                                                    <td className="text-right">
                                                        Rs. {orderDetails.price[i]}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                            <tr>
                                                <td className="text-left">
                                                    {orderDetails.pName} <br />
                                                    Rs. {orderDetails.iPrice} X {orderDetails.quantity}
                                                </td>
                                                <td className="text-right">Rs. {orderDetails.price}</td>
                                            </tr>
                                        )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="text-left">PRODUCTS COUNT</td>
                                        <td className="text-right">{orderDetails.items}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left">SUB TOTAL</th>
                                        <td className="text-right">
                                            Rs. {orderDetails.total_payable}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">DISCOUNT</td>
                                        <td className="text-right">Rs. {orderDetails.discount}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left">NET PAYABLE</th>
                                        <td className="text-right">
                                            Rs.
                      {(
                                                orderDetails.total_payable - orderDetails.discount
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">TOTAL RECEIVED AMOUNT</td>
                                        <td className="text-right">
                                            Rs. {parseFloat(orderDetails.total_received).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">CASH</td>
                                        <td className="text-right">
                                            Rs. {orderDetails.customer_pay}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">CHANGE</td>
                                        <td className="text-right">
                                            Rs. {orderDetails.customer_return}
                                        </td>
                                    </tr>
                                    {(orderDetails.total_payable - orderDetails.discount).toFixed(
                                        2
                                    ) !== parseFloat(orderDetails.total_received).toFixed(2) && orderDetails.order_status === "pending" && (
                                            <tr className="text-right">
                                                <td>DUE:</td>
                                                <td className="text-danger">
                                                    {(
                                                        orderDetails.total_received - orderDetails.discount
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}
                                </tfoot>
                            </table>
                            <div className="order-barcode text-center">
                                <Barcode
                                    value={this.props.orderCode}
                                    format="CODE128"
                                    background="transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}


export default Salereceipt;
