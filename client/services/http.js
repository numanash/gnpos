/* eslint-disable no-console */
import axios from "axios";
import Cookie from "universal-cookie";
// import { logOutApi } from '../../Main/Services/Auth';

const cookie = new Cookie();
// import store from '../store/index'
// import { authLogout } from '../modules/auth/store/actions'

// const version = 'v1';
// const API_URL = (process.env.NODE_ENV === 'development') ? process.env.BASE_URL || (`http://localhost:${process.env.PORT}/api/${version}/`) : `/api/${version}`;
const API_URL = "http://localhost:3005/api";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
if (cookie.get("Authorization")) {
  axios.defaults.headers.common["x-auth-token"] =
    "gnposauth" + cookie.get("Authorization");
}
const mainBody = document.getElementsByClassName("main-body");

function addClass() {
  if (mainBody.length) {
    mainBody[0].classList.add("loading-indicator");
  }
}
function removeClass() {
  if (mainBody.length) {
    mainBody[0].classList.remove("loading-indicator");
  }
}

axios.interceptors.request.use(
  function(config) {
    // spinning start to show
    // UPDATE: Add this code to show global loading indicator

    // addClass();
    const token = "gnposauth" + cookie.get("Authorization");

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  function(error) {
    // removeClass();
    if (
      error.response.status === 404 &&
      error.response.data.parent &&
      error.response.data.parent.code === "ECONNREFUSED"
    ) {
      alert("db not connected");
    }
    if (error.response.status) {
      return Promise.reject({ data: { message: "Sorry Url Not Found" } });
    }
    return Promise.reject(error.response);
  }
);

axios.interceptors.response.use(
  function(response) {
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    // removeClass();

    return response;
  },
  error => {
    // removeClass();

    if (error.response) {
      if (error.response.status === 401) {
        let location = window.location.pathname;
        cookie.remove("Authorization");
        window.location.pathname = `/login?Redirect=${location}`;
        // logOutApi();
      }
      if (
        error.response.status === 404 &&
        error.response.data.parent &&
        error.response.data.parent.code === "ECONNREFUSED"
      ) {
        alert("db not connected");
      }
      return Promise.reject(error.response);
    }

    if (error.status === 401) {
      let location = window.location.pathname;
      cookie.remove("Authorization");
      window.location.pathname = `/login?Redirect=${location}`;
      // logOutApi();
    }
    if (error.status && error.status === 404) {
      return Promise.reject({ data: { message: "Sorry Url Not Found" } });
    }
    return Promise.reject(error);
  }
);

export default axios;
