import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./SignIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="">
        <div className="p-2">
          <Switch>
            <Route path="/signIn" exact={true} component={SignIn} />
            <Redirect from="*" to="/signIn" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
