import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChatAvatar from "./ChatAvatar";
import { SelectedContext, SocketContext } from "../context";
import { useDebugStyles, useFontStyles } from "../styles";
import events from "../../../common/events";

// Material UI
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../services/chatRoomServices";

const useStyles = makeStyles({
  chat: {
    backgroundColor: (props) => (props.selected ? "white" : "#FBFCFD"),
    height: "4em",
  },
  badge: {
    backgroundColor: "#3F92FF",
  },
  badgeContent: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    color: "white",
  },
  secondary: {
    color: "#9CADC8",
    fontSize: "75%",
  },
  defaultSecondary: {
    color: (props) => (props.selected ? "white" : "#FBFCFD"),
  },
});

// TODO: need to adjust right margin for badge content
// TODO: updated badge count
// TODO: need to set secondary text
// TODO: need to style secondary text based on:
//          - current typing: italics
//          - new message: bold

export default function Chat({
  id,
  creator,
  participants,
  color,
  handleClick,
}) {
  const { selected } = useContext(SelectedContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const isActive = selected && selected?._id === id;
  const classes = useStyles({ selected: isActive });
  const fontClasses = useFontStyles();
  const { username } = useSelector((state) => state.user);

  const defaultSecondaryText = (
    <Typography
      noWrap
      className={`${fontClasses.base} ${classes.defaultSecondary}`}
    >
      Invisible
    </Typography>
  );

  const [badgeCount, setBadgeCount] = useState(null);
  const [secondaryText, setSecondaryText] = useState(defaultSecondaryText);

  const debugClasses = useDebugStyles();

  const label = participants.filter((user) => user != username).join(", ");

  useEffect(() => {
    async function computeBadgeCount() {
      // get unread messages
      // TODO: need to finish
      const msgs = await dispatch(getMessages(id));
      console.log("msgs: ", msgs);
    }

    if (id) {
      computeBadgeCount();
    }
  }, [id]);

  useEffect(() => {
    if (socket && id) {
      socket.emit(events.JOIN_ROOM, id);
      socket.on(events.NEW_MESSAGE, (msg) => {
        if (!isActive) {
          setBadgeCount((count) => count + 1);
        }
        setSecondaryText(msg.message);
      });
      socket.on(events.TYPING, ({ typing, roomId }) => {
        if (typing && id === roomId) {
          setSecondaryText(
            <Typography
              noWrap
              className={`${fontClasses.base} ${classes.secondary}`}
              style={{ fontStyle: "italic" }}
            >
              Typing...
            </Typography>
          );
        } else {
          // TODO: set to the last message
          setSecondaryText(defaultSecondaryText);
        }
      });
    }
  }, [socket, id]);

  function _handleClick() {
    handleClick(id, creator, participants);
  }

  return (
    <ListItem
      component={Paper}
      elevation={0}
      className={classes.chat}
      onClick={_handleClick}
    >
      <ListItemAvatar>
        <ChatAvatar color={color} username={participants[0]} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            noWrap
            className={`${fontClasses.base} ${fontClasses.bold}`}
          >
            {label}
          </Typography>
        }
        secondary={
          <Typography
            noWrap
            className={`${fontClasses.base} ${classes.secondary}`}
          >
            {secondaryText}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        {badgeCount && (
          <Badge
            badgeContent={
              <Typography
                component="span"
                variant="inherit"
                className={classes.badgeContent}
              >
                {badgeCount}
              </Typography>
            }
            classes={{ badge: classes.badge }}
          />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Chat.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
