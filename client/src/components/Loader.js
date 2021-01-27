import React from "react";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loading: {
    color: "#72ACFB",
  },
});

export default function Loader() {
  const classes = useStyles();
  return <CircularProgress className={classes.loading} />;
}
