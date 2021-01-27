import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../ducks/site";

// Material UI
import MUISnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  message: {
    fontFamily: "Open Sans",
  },
});

export default function SnackBar() {
  const [open, setOpen] = useState(false);
  const msg = useSelector((state) => state.site.snackBarOptions.msg);
  const severity =
    useSelector((state) => state.site.snackBarOptions.severity) || "success";
  const dispatch = useDispatch();

  const classes = useStyles();

  function handleClose() {
    setOpen(false);
  }

  function handleExited() {
    dispatch(
      setSnackBar({
        msg: null,
      })
    );
  }

  useEffect(() => {
    setOpen(!msg ? false : true);
  }, [msg]);

  return (
    <MUISnackBar open={open} onClose={handleClose} onExited={handleExited}>
      <Alert severity={severity} className={classes.message} variant="filled">
        {msg}
      </Alert>
    </MUISnackBar>
  );
}
