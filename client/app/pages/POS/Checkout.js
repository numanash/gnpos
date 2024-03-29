import React from 'react';
import { Modal, Button, Row, Col, Table, Alert } from "react-bootstrap";
import FormInput from "../../components/FormInput/index.js";

const Checkout = (props) => {
    let orderDetails = props.orderDetails;
    return (<Modal onHide={props.hideModal} show={props.showModal} onClose={props.close} size='lg'>
        <Modal.Body>
            {props.error && <Alert variant="danger">{props.error}</Alert>}
            {orderDetails.overAllCost ? <><Row>
                <Col sm="10">
                    <FormInput
                        name="customer_pay"
                        onChange={props.handleCustomerPay}
                        value={orderDetails.customer_pay}
                        error={props.error}
                        label="Amount"
                        as="input"
                        type="number"
                    />
                    <FormInput
                        rows="4"
                        name="orderNote"
                        label="Order Note?"
                        as="textarea"
                        onChange={props.handleInput}

                    />
                    <Table bordered>
                        <tbody className="font-weight-bold">
                            <tr>
                                <td className="">Total Items</td>
                                <td>{orderDetails.totalItems}</td>
                                <td className="">Total Payable</td>
                                <td>{orderDetails.overAllCost}</td>
                            </tr>
                            <tr>
                                <td className="">Pay By Customer</td>
                                <td>{orderDetails.customer_pay}</td>
                                <td className="">Change</td>
                                <td>{orderDetails.customer_change}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col sm="2" className="text-center">
                    <h6>Quick Pay</h6>
                    <Button className="w-100 rounded-0" variant="warning" value={orderDetails.overAllCost} onClick={props.handleCustomerPay}>{orderDetails.overAllCost}</Button>
                    {[10, 20, 50, 100, 500, 1000, 5000].map((price, i) => <Button className="w-100 rounded-0" onClick={props.handleCustomerPay} variant={i % 2 ? "warning" : "primary"} key={"price_" + price + i} value={price}>{price}</Button>)}
                </Col>
            </Row>
                {props.update ?
                    <Button variant="success" onClick={props.submitPayNow}>Complete Order</Button>
                    :
                    <>
                        <Button variant="success" onClick={props.submitPayNow}>Pay Now</Button>&nbsp;
                        <Button variant="warning" onClick={props.saveOrderNow}>Save Order</Button>&nbsp;
                        <Button variant="danger" onClick={props.advanceOrder}>Advance Order</Button>
                    </>
                }
            </>
                : <div>
                    Please select items first
            </div>
            }
        </Modal.Body>

    </Modal>);
}

export default Checkout;