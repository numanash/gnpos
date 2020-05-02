import React from "react";
import ReactDOM from "react-dom";
// import 'font-awesome/scss/font-awesome.scss';
import "./styles/style.scss";
import App from "./app/App";
import Auth from "./app/auth/Auth.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import config from "./configs";
import store from "./store";
import Cookie from "universal-cookie";

let cookie = new Cookie();

if (cookie.get("Authorization")) {
  const Index = () => {
    return (
      <Provider store={store}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </Provider>
    );
  };
  ReactDOM.render(<Index />, document.getElementById("root"));
} else {
  //   window.location = "/signIn";
  const Index = () => {
    return (
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );
  };
  ReactDOM.render(<Index />, document.getElementById("root"));
}
