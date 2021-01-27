import React, { useState } from "react";
import ChatAvatar from "./ChatAvatar";
import { useFontStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../services/userServices";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import List from "./List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  username: {
    marginLeft: "10%",
  },
});

// TODO: fix popover and add logout call

export default function UserPanel() {
  const { username, color } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const fontClasses = useFontStyles();

  function handleOpenPopover(e) {
    setAnchorEl(e.target);
  }

  function handleClosePopover() {
    setAnchorEl(null);
  }

  function handleLogOut() {
    dispatch(logout());
    history.push("/login");
  }

  const open = Boolean(anchorEl);

  return (
    <Grid container item wrap="nowrap">
      <Grid item>
        <ChatAvatar username={username} color={color} />
      </Grid>
      <Grid container item alignContent="center">
        <Typography
          variant="h6"
          noWrap
          className={`${fontClasses.base} ${fontClasses.bold} ${classes.username}`}
        >
          {username}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="options" onClick={handleOpenPopover}>
          <MoreHorizIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <List>
            <ListItem button onClick={handleLogOut}>
              Log Out
            </ListItem>
          </List>
        </Popover>
      </Grid>
    </Grid>
  );
}
