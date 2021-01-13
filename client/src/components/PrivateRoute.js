import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute(props) {
  const token = useSelector((state) => state.token);

  return token ? <Route {...props} /> : <Redirect to="/login" />;
}