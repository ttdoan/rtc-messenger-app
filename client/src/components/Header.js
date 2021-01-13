import React from "react";
import PropTypes from "prop-types";
import { useFontStyles, useButtonStyles } from "../styles";
import { useHistory } from "react-router-dom";
// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: "4%",
  },
});

export default function Header({ msg, link, url }) {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const buttonClasses = useButtonStyles();
  let history = useHistory();

  function handleClick() {
    history.push(url);
  }

  return (
    <Grid
      item
      container
      justify="flex-end"
      wrap="nowrap"
      className={classes.root}
    >
      <Grid item container justify="flex-end" alignContent="center">
        <Grid item>
          <Typography className={`${fontClasses.root} `}>{msg}</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={5} justify="center">
        <Button
          onClick={handleClick}
          size="large"
          className={`${fontClasses.headerLink} ${buttonClasses.root}`}
        >
          {link}
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  msg: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
