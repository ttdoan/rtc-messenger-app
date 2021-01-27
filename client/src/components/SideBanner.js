import React from "react";
import bg from "../../public/sidebanner-bg.png";
import ChatIcon from "../../public/chat.png";
import { useFontStyles } from "../styles";

// Material UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const height = "700px";
const useStyles = makeStyles({
  root: {
    color: "white",
    position: "relative",
    height,
  },
  banner: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    "&:before": {
      content: '""',
      backgroundImage: "linear-gradient(#3A8DFF, #86B9FF)",
      opacity: 0.85,
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
    },
  },
  msg: {
    color: "white",
    fontSize: "26px",
  },
});

export default function SideBanner() {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  return (
    <Grid container item xs={5} className={`${classes.root} ${classes.banner}`}>
      <Grid
        item
        container
        className={`${classes.root}`}
        justify="center"
        alignContent="center"
        spacing={5}
      >
        <Grid item>
          <img src={ChatIcon} alt="Chat Icon" />
        </Grid>
        <Grid container item justify="center">
          <Grid item xs={7}>
            <Typography
              className={`${fontClasses.general} ${classes.msg}`}
              align="center"
            >
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
