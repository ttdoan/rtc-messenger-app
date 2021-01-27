import React from "react";
import PropTypes from "prop-types";
import { useFontStyles, useButtonStyles } from "../styles/";
import SideBanner from "../components/SideBanner";
// Material UI
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  formContainer: {
    height: "100%",
    marginTop: "10%",
  },
  form: {
    width: "100%",
  },
  intro: {
    marginBottom: "10%",
  },
});

export default function AuthenticationPage({
  formik,
  intro,
  header,
  submitBtnLabel,
  children,
}) {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const fontClasses = useFontStyles();

  return (
    <Grid container>
      <SideBanner />
      <Grid container item xs={7} justify="center">
        <Grid
          container
          item
          justify="flex-start"
          direction="column"
          wrap="nowrap"
        >
          {header}
          <Grid
            container
            item
            justify="center"
            className={`${classes.formContainer}`}
          >
            <Grid container item xs={7}>
              <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Grid item className={classes.intro}>
                  <Typography
                    variant="h4"
                    className={`${fontClasses.base} ${fontClasses.bold}`}
                  >
                    {intro}
                  </Typography>
                </Grid>
                {children}
                <Grid container item justify="center">
                  <Button
                    className={`${buttonClasses.root} ${buttonClasses.submit} ${fontClasses.base} ${fontClasses.bold}`}
                    type="submit"
                  >
                    {submitBtnLabel}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

AuthenticationPage.propTypes = {
  formik: PropTypes.object.isRequired,
  intro: PropTypes.string.isRequired,
  header: PropTypes.element.isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
};
