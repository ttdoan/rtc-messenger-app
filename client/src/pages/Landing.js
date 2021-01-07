import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

const landinPageStyle = (theme) => ({
  landingContainer: {
    margin: theme.spacing.unit * 2,
  },
});

function LandingPage() {
  return <></>;
}

export default withStyles(landinPageStyle)(LandingPage);
