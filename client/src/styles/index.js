import { makeStyles } from "@material-ui/core";

const useFontStyles = makeStyles({
  base: {
    fontFamily: "Open Sans",
  },
  general: {
    fontFamily: "Open Sans",
    fontWeight: 400,
  },
  regular: {
    fontWeight: 400,
  },
  bold: {
    fontWeight: 600,
  },
});

const useButtonStyles = makeStyles({
  root: {
    textTransform: "none",
  },
  submit: {
    backgroundColor: "#3A8DFF",
    color: "white",
    width: "50%",
    height: "4em",
    "&:hover": {
      color: "#3A8DFF",
      border: "2px solid #3A8DFF",
      backgroundColor: "white",
    },
  },
});

const useDebugStyles = makeStyles({
  root: {
    border: "solid red",
  },
});

export { useFontStyles, useButtonStyles, useDebugStyles };
