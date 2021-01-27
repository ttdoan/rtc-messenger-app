import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";

// Material UI
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal,
  },
}));

export default function Loading() {
  const classes = useStyles();
  const loading = useSelector((state) => state.site.loading);

  return (
    <Backdrop open={loading} className={classes.backdrop}>
      <Loader />
    </Backdrop>
  );
}
