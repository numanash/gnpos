import React, { Component } from "react";

// import middleWare from "../../actions/middleWare";
import axios from "../../../services/http";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactToPrint from "react-to-print";

import "react-datepicker/dist/react-datepicker.css";
// import Results from "./utils/result";
import { month } from "./utils/dateMonth";
import { Card, Button, Row, Col } from "react-bootstrap";

class SalesReports extends Component {
    state = {
        results: null,
        from: month,
        to: new Date(),
        result: []
    };
    // UNSAFE_componentWillMount() {
    //     const to = moment(this.state.to).format("YYYY-MM-DD HH:mm:ss");
    //     const from = moment(this.state.from).format("YYYY-MM-DD HH:mm:ss");
    //     this.props.dispatch(
    //         middleWare("reports").getReports("yes", to, from, "sales")
    //     );
    // }
    // UNSAFE_componentWillReceiveProps(props) {
    //     this.setState({
    //         result: props.reports.items.sales
    //     });
    // }

    searchResult = e => {
        if (e)
            e.preventDefault();
        const to = moment(this.state.to).format("YYYY-MM-DD HH:mm:ss");
        const from = moment(this.state.from).format("YYYY-MM-DD HH:mm:ss");
        axios.get(`/reports/sales?from=${from}&to=${to}`).then(res => {
            this.setState({
                result: res.data
            })
        }).catch(err => {
            console.log({ err })
        })
        // this.props.dispatch(
        //     middleWare("reports").getReports("yes", to, from, "best-sales")
        // );
    };

    componentDidMount() {
        this.searchResult();
    }

    dateToHandler = e => {
        this.setState({ to: e });
    };
    dateFromHandler = e => {
        this.setState({ from: e });
    };

    // searchResult = e => {
    //     e.preventDefault();
    //     const to = moment(this.state.to).format("YYYY-MM-DD HH:mm:ss");
    //     const from = moment(this.state.from).format("YYYY-MM-DD HH:mm:ss");
    //     this.props.dispatch(
    //         middleWare("reports").getReports("yes", to, from, "sales")
    //     );
    // };

    render() {
        const { result } = this.state;
        if (result) {
            return (
                <Card>
                    <Card.Header>
                        <div className="d-flex w-100">
                            <form onSubmit={this.searchResult} className=" w-100" >
                                <Row className="100">
                                    <Col md="4">
                                        <DatePicker
                                            selected={this.state.from}
                                            onChange={this.dateFromHandler}
                                            className="form-control w-100"
                                            wrapperClassName="w-100 mr-3"
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeCaption="time"
                                        />
                                    </Col>
                                    <Col md="4">
                                        <DatePicker
                                            selected={this.state.to}
                                            onChange={this.dateToHandler}
                                            className="form-control w-100"
                                            wrapperClassName="w-100 mr-3"
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="MMMM d, yyyy h:mm:ss aa"
                                            timeCaption="time"
                                        />
                                    </Col>
                                    {/* <input type="date" className="date" name="from" onChange={this.dateHandler} />
                                    <input type="date" className="date" name="to" onChange={this.dateHandler} /> */}
                                    <Col > 
                                        <Button type="submit">Search</Button>
                                    </Col>
                                    <Col>
                                        <Button className="ml-3" type="button">
                                            <ReactToPrint
                                                trigger={() => <a className="style-none text-white" href="javascript:void(0)">Print this out!</a>}
                                                content={() => this.componentRef}
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                           
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="container">
                        <div className="row">
                            <div className="col-md-6 detailReport">
                                <div className="Report" ref={el => (this.componentRef = el)}>
                                    <div className="d-none d-print-block mt-3 text-primary">
                                        <h1 className="text-center text-primary">
                                            GN POS(POINT OF SALE)
                    </h1>
                                        <p className="float-left">GNP POS</p>
                                        <p className="float-right">
                                            {moment(new Date()).format("DD-MM-YYYY, HH:mm:ss")}
                                        </p>
                                    </div>
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <td>Entries</td>
                                                <td className="text-right">Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.length !== 0 ? (
                                                result.map((o, index) => {
                                                    let {
                                                        code,
                                                        total_received,
                                                        quantity,
                                                        price,
                                                        total_payable,
                                                        pName,
                                                        iCode,
                                                        createdAt
                                                    } = o;
                                                    if (quantity.includes(",")) {
                                                        quantity = quantity.split(",");
                                                        price = price.split(",");
                                                        pName = pName.split(",");
                                                        iCode = iCode.split(",");
                                                        // return <Results quantity price pName iCode o key={index} />;
                                                        return quantity.map((v, i) => {
                                                            if (i === 0) {
                                                                return (
                                                                    <React.Fragment key={(index += 1)}>
                                                                        <tr className="font-weight-bold">
                                                                            <td>
                                                                                {moment(createdAt).format(
                                                                                    "DD-MM-YYYY, HH:mm:ss"
                                                                                )}
                                                                                &nbsp;—&nbsp;{code}
                                                                            </td>
                                                                            <td className="text-right">
                                                                                Rs: {total_received}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="">
                                                                                {quantity[i] + " x " + pName[i]}
                                                                            </td>
                                                                            <td className="text-right">
                                                                                Rs: {price[i]}
                                                                            </td>
                                                                        </tr>
                                                                    </React.Fragment>
                                                                );
                                                            } else {
                                                                return (
                                                                    <tr key={(index += 1)}>
                                                                        <td className="">
                                                                            {quantity[i] + " x " + pName[i]}
                                                                        </td>
                                                                        <td className="text-right">
                                                                            Rs: {price[i]}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        });

                                                        // }
                                                        // return (
                                                        //   <React.Fragment key={index}>
                                                        //     {i === 0 && (
                                                        //       <tr className="font-weight-bold">
                                                        //         <td>
                                                        //           {createdAt}--{code}
                                                        //         </td>
                                                        //         <td className="text-right">
                                                        //           Rs: {total_received}
                                                        //         </td>
                                                        //       </tr>
                                                        //     )}
                                                        //     <tr key={index}>
                                                        //       <td className="">{quantity[i] + "X" + pName[i]}</td>
                                                        //       <td className="text-right">Rs: {price[i]}</td>
                                                        //     </tr>
                                                        //   </React.Fragment>
                                                        // );
                                                        // }
                                                    } else {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <tr className="font-weight-bold">
                                                                    <td>
                                                                        {moment(createdAt).format(
                                                                            "DD-MM-YYYY, HH:mm:ss"
                                                                        )}
                                                                        &nbsp;—&nbsp;{code}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        Rs: {total_received}
                                                                    </td>
                                                                </tr>
                                                                <tr key={index}>
                                                                    <td>{quantity + " x " + pName}</td>
                                                                    <td className="text-right">{price}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                    <tr>
                                                        <td>
                                                            There is nothing to show, please choose a different
                                                            time interval.
                          </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Card.Body>
                </Card>
            );
        } else {
            return <div />;
        }
    }
}

const mapStateToProps = state => {
    return {
        reports: state.reports
    };
};

export default connect(mapStateToProps)(SalesReports);
