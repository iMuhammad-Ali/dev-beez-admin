import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((s) => s.auth.user); // adjust to your slice shape
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
