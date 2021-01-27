import React from "react";
import UserAvatar from "./UserAvatar";

// Material UI
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  badge: {
    backgroundColor: "#1CED84",
  },
});

// TODO: make status color configurable

export default function ChatAvatar({ username, color, icon }) {
  const classes = useStyles({ color: null });

  return (
    <Badge
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      overlap="circle"
      classes={{ badge: classes.badge }}
    >
      <UserAvatar username={username} color={color} icon={icon} />
    </Badge>
  );
}

ChatAvatar.defaultProps = {
  color: "#4F5B62",
};
