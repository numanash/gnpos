import React, { Component } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import axios from "../../../services/Http";
import Cookie from "universal-cookie";

let cookie = new Cookie();

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSignIn = e => {
    e.preventDefault();
    axios
      .post("/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log({ res });

        if (res.data.token) {
          cookie.set("Authorization", res.data.token, {
            path: "/",
            maxAge: 24 * 3600 * 30 //age
          });
          window.location = "/dashboard";
        }
      })
      .catch(err => {
        console.log({ err });
        this.setState({
          error: err.data.message
        });
      });
  };

  render() {
    return (
      <Card className="w-25 m-auto">
        <Card.Body>
          <h3 className="text-center">Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            {this.state.error && (
              <small className="text-danger">{this.state.error}</small>
            )}
            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={this.handleInput}
                name="email"
                value={this.state.email}
                placeholder="Email"
                autoComplete="false"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={this.handleInput}
                name="password"
                value={this.state.password}
                autoComplete="false"
                placeholder="Password"
              />
            </Form.Group>
            <Button type="submit">Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default SignIn;
