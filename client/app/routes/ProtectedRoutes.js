import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../actions/auth";
import { toast } from "react-toastify";
import http from "../services/httpServices";

const ProtectedRoute = ({
  path,
  hasRole,
  component: Component,
  render,
  ...rest
}) => {
  const user = getCurrentUser();

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          const location = props.history.location.pathname.toString();

          toast.warn("Please login first to access");
          if (location === "/user/login") {
            localStorage.setItem("history", "/");
          } else {
            localStorage.setItem("history", location);
          }
          return (
            <Redirect
              to={{
                pathname: "/user/login",
                state: { from: props.location }
              }}
            />
          );
        }

        if (user.roles) {
          let newRolesArr = new Array();
          user.roles.forEach(rA1 =>
            hasRole.forEach(rA2 => {
              if (rA1 === rA2) {
                newRolesArr.push(rA1);
              }
            })
          );
          if (newRolesArr.length === 0) {
            return <Redirect to="/access-denied" />;
          }
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
