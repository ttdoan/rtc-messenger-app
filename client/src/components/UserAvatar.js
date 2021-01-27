import React from "react";
import PropTypes from "prop-types";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useFontStyles } from "../styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) => props.color || "red",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    "& .MuiTypography-root": {
      fontSize: "larger",
    },
  },
}));

export default function UserAvatar({ username, color, icon, size }) {
  const classes = useStyles({ color });
  const fontClasses = useFontStyles();

  return (
    <Avatar
      alt={username}
      src={icon}
      className={`${classes.root} ${classes[size]}`}
    >
      <Typography
        component="span"
        className={`${fontClasses.base} ${fontClasses.bold}`}
      >
        {username.charAt(0).toUpperCase()}
      </Typography>
    </Avatar>
  );
}

UserAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

UserAvatar.defaultProps = {
  size: "medium",
};
