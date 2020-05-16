import React, { Component, useEffect, useState } from "react";
import Aux from "../../constants/hoc/_Aux";
import {
  Row,
  Col,
  ProgressBar,
  Card,
  Accordion,
  FormLabel,
  Table
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import middleware from "../../../middleware";
import moment from "moment";
const Dashboard = props => {
  const [mount, setMount] = useState(true);
  // const [dashboard,setDashboard] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (mount) {
      dispatch(middleware("reports").fetchAll("dashboard"));
      setMount(false);
    }
  });
  let dashboard = useSelector(state => state.reports.data);
  dashboard = dashboard ? dashboard.data : undefined;
  return (
    <div className="dashboard container-fluid">
      {dashboard ? (
        <>
          <Row>
            <Col xs="12" sm="6" md="3">
              <div className="info-box bg-light">
                <div className="w-100">
                  <h5 className="font-weight-bold">
                    Sales
                    <span className="pull-right ">
                      <i className="fa fa-line-chart"></i>
                    </span>
                  </h5>
                  <h6 className="d-block w-100">
                    <div className="my-2">
                      <span className="">Today</span>
                      <span className="pull-right">
                        <i
                          className={`fa ${
                            dashboard.result.todayItems <
                            dashboard.result.yesterdayItems
                              ? "fa-caret-down text-danger"
                              : "fa-caret-up text-success"
                          } `}
                        ></i>
                        &nbsp;{dashboard.result.todayItems}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Yesterday</span>
                      <span className="pull-right">
                        {dashboard.result.yesterdayItems}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Total</span>
                      <span className="pull-right">
                        {dashboard.result.total_sold_items}
                      </span>
                    </div>
                  </h6>
                </div>
              </div>
            </Col>
            <Col xs="12" sm="6" md="3">
              <div className="info-box bg-light">
                <div className="w-100">
                  <h5 className="font-weight-bold">
                    Global turnover
                    <span className="pull-right ">
                      <i className="fa fa-money"></i>
                    </span>
                  </h5>
                  <h6 className="d-block w-100">
                    <div className="my-2">
                      <span className="">Today</span>
                      <span className="pull-right">
                        <i
                          className={`fa ${
                            dashboard.result.todayItems <
                            dashboard.result.yesterdayItems
                              ? "fa-caret-down text-danger"
                              : "fa-caret-up text-success"
                          } `}
                        ></i>
                        &nbsp;<span>Rs.</span> {dashboard.result.todayCash}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Yesterday</span>
                      <span className="pull-right">
                        <span>Rs.</span> {dashboard.result.yesterdayCash}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Total</span>
                      <span className="pull-right">
                        <span>Rs.</span> {dashboard.result.total_received_cash}
                      </span>
                    </div>
                  </h6>
                </div>
              </div>
            </Col>
            <Col xs="12" sm="6" md="3">
              <div className="info-box bg-light">
                <div className="w-100">
                  <h5 className="font-weight-bold">
                    Inventory
                    <span className="pull-right ">
                      <i className="fa fa-shopping-cart"></i>
                    </span>
                  </h5>
                  <h6 className="d-block w-100">
                    <div className="my-2">
                      <span className="">Sold</span>
                      <span className="pull-right">
                        {/* <i
                        className={`fa ${
                          dashboard.result.todayItems <
                          dashboard.result.yesterdayItems
                            ? "fa-caret-down text-danger"
                            : "fa-caret-up text-success"
                        } `}
                      ></i> */}
                        &nbsp; {dashboard.inventory.sold}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Remaining</span>
                      <span className="pull-right">
                        {dashboard.inventory.remaining}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="">Total </span>
                      <span className="pull-right">
                        <span>
                          {dashboard.inventory.sold +
                            dashboard.inventory.remaining}
                        </span>
                      </span>
                    </div>
                  </h6>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="9">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <Card.Title as="h3" className="mb-0">
                      Latest Orders
                      <Accordion.Toggle
                        as={"span"}
                        className="float-right"
                        eventKey="0"
                      >
                        <i className="fa fa-minus"></i>
                      </Accordion.Toggle>
                    </Card.Title>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Code</th>
                            <th>Payment Type</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboard.orders.map(order => {
                            return (
                              <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.code}</td>
                                <td>{order.payment_type}</td>
                                <td>{order.total_items}</td>
                                <td>{order.total}</td>
                                <td>
                                  {moment(order.createdAt).format(
                                    "ddd, MMM Do YYYY, h:mm:ss a"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col xs="12" sm="12" md="6"></Col>
          </Row>
        </>
      ) : (
        <ProgressBar variant="primary" animated now="100" />
      )}
    </div>
  );
};

export default Dashboard;
