import React from "react";
import PropTypes from "prop-types";
import { useFontStyles } from "../styles";

// Material UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

const useGridInputStyles = makeStyles({
  root: {
    height: "15%",
  },
  underline: {
    "&:hover:not(.Mui-disabled)::before": {
      borderBottomColor: "#3A8DFF",
    },
  },
});

function FieldError({ msg }) {
  const fontClasses = useFontStyles();

  if (!msg) {
    return null;
  }

  return (
    <Typography color="error" variant="caption" className={fontClasses.base}>
      {msg}
    </Typography>
  );
}

export default function GridInput({ formik, label, name, ...rest }) {
  const classes = useGridInputStyles();
  const fontClasses = useFontStyles();

  const hasError =
    typeof formik.errors[name] !== "undefined" && formik.errors[name] !== "";

  return (
    <Grid
      container
      item
      direction="column"
      alignContent="flex-start"
      className={`${classes.root}`}
      {...rest}
    >
      <InputLabel className={fontClasses.root}>{label}</InputLabel>
      <Input
        name={name}
        className={`${classes.underline} ${fontClasses.base}`}
        onChange={formik.handleChange}
        value={formik.values[name]}
        error={hasError}
        fullWidth
      ></Input>
      <FieldError msg={formik.errors[name]} />
    </Grid>
  );
}

GridInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};
