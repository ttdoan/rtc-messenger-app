import { makeStyles } from "@material-ui/core";

const useFontStyles = makeStyles({
  root: {
    fontFamily: "Open Sans",
    color: "#B0B0B0",
    fontWeight: 400,
  },
  base: {
    fontFamily: "Open Sans",
    fontWeight: 400,
  },
  intro: {
    fontFamily: "Open Sans",
    color: "#000",
    fontWeight: 600,
  },
  banner: {
    fontFamily: "Open Sans",
    color: "white",
    fontWeight: 400,
    fontSize: "26px",
  },
  headerLink: {
    fontFamily: "Open Sans",
    color: "#3A8DFF",
    fontWeight: 600,
  },
  submit: {
    fontFamily: "Open Sans",
    color: "white",
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
