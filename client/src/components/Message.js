import React from "react";
import UserAvatar from "./UserAvatar";

// Material UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDebugStyles, useFontStyles } from "../styles";
import { useSelector } from "react-redux";

const radius = "0.7em";
const useStyles = makeStyles({
  rootContainer: {
    // border: "solid red",
  },
  "message-text": {
    // borderRadius: "0.5em",
    padding: "1em 1em",
  },
  messageContainer: {
    // margin: "0 5%",
  },
  other: {
    "& $message-text": {
      borderRadius: `0 ${radius} ${radius} ${radius}`,
      background: "linear-gradient(90deg, #3A8DFF, #6CC1FF)",
      color: "white",
    },
  },
  self: {
    "& $message-text": {
      borderRadius: `${radius} 0 ${radius} ${radius}`,
      backgroundColor: "#F4F6FA",
      color: "#91A3C0",
    },
  },
});

export default function Message({ sender, icon, date, children }) {
  const { username } = useSelector((state) => state.user);
  const isSelf = sender === username;

  const classes = useStyles({ self: isSelf });
  const fontClasses = useFontStyles();
  const debugClasses = useDebugStyles();

  return (
    <Grid
      container
      justify={isSelf ? "flex-end" : "flex-start"}
      className={`${isSelf ? classes.self : classes.other} ${
        classes.rootContainer
      }`}
    >
      <Grid
        container
        item
        xs={9}
        wrap="nowrap"
        direction={isSelf ? "row-reverse" : "row"}
      >
        <Grid item>
          <UserAvatar username={sender} icon={icon} size="small" />
        </Grid>
        <Grid
          container
          item
          alignItems={isSelf ? "flex-end" : "flex-start"}
          direction="column"
        >
          <Grid item>
            <Typography
              variant="caption"
              className={`${fontClasses.general} ${classes.date}`}
            >
              {date}
            </Typography>
          </Grid>
          <Grid item className={classes.messageContainer}>
            <Typography
              className={`${fontClasses.general} ${classes["message-text"]}`}
            >
              {children}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
