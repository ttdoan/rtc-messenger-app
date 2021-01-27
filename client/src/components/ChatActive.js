import React, { useContext, useEffect, useState } from "react";
import { SelectedContext, SocketContext } from "../context";
import { useDebugStyles, useFontStyles } from "../styles";
import Message from "./Message";
import { useFormik } from "formik";
import { getMessages, sendMessage } from "../services/chatRoomServices";
import { setSnackBar } from "../ducks/site";
import events from "../../../common/events";

// Material UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SentimentSatisfiedOutlined from "@material-ui/icons/SentimentSatisfiedOutlined";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  activeChat: {
    height: "100%",
  },
  header: {
    position: "relative",
    height: "10%",
    backgroundColor: "white",
    "&::after": {
      content: "''",
      position: "absolute",
      boxShadow: "0 5px 5px #979797",
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: "0",
      right: "1%",
    },
  },
  username: {
    marginLeft: "1.5%",
    "& .MuiTypography-root": {
      fontSize: "125%",
    },
  },
  badge: {
    marginLeft: "1.5%",
    "& .MuiBadge-badge": {
      backgroundColor: "#1CED84",
    },
  },
  status: {
    marginLeft: "1%",
    "& .MuiTypography-root": {
      color: "#BFC9DB",
      fontSize: "75%",
    },
  },
  messages: {
    overflow: "auto",
    margin: "0 2%",
    marginTop: "1%",
  },
  input: {
    padding: "0 3%",
    "& form": {
      width: "100%",
    },
    "& .MuiInputBase-root": {
      fontFamily: "Open Sans",
      color: "#9CADC8",
      backgroundColor: "#F4F6FA",
      marginBottom: "2%",
      marginTop: "2%",
      "& .MuiInputBase-input::placeholder": {
        fontWeight: 500,
        color: "#9CADC8",
        opacity: 1,
      },
      "& .MuiSvgIcon-root": {
        color: "#9CADC8",
      },
    },
  },
});

// TODO: configure status
// TODO: configure badge color
// TODO: add the following buttons for options
//    - clear conversation (clear)
//    - remove user (delete)
function Header({ username, participants }) {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  const label = participants.filter((user) => user != username).join(", ");

  return (
    <Grid
      container
      item
      wrap="nowrap"
      alignItems="center"
      className={classes.header}
    >
      <Grid item className={classes.username}>
        <Typography
          variant="h6"
          noWrap
          className={`${fontClasses.base} ${fontClasses.bold}`}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item className={classes.badge}>
        <Badge variant="dot" badgeContent="" />
      </Grid>
      <Grid item xs className={classes.status}>
        <Typography className={`${fontClasses.base}`}>Online</Typography>
      </Grid>
      <Grid item>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default function ChatActive() {
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);

  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { selected } = useContext(SelectedContext);
  const socket = useContext(SocketContext);
  const formik = useFormik({
    initialValues: {
      chatInput: "",
    },
    onSubmit: handleSubmit,

    validateOnChange: false,
  });

  const classes = useStyles();
  const debugClasses = useDebugStyles();

  useEffect(() => {
    // TODO: get all messages
    async function loadMessages() {
      try {
        const msgs = await dispatch(getMessages(selected?._id));
        setMessages(msgs);
      } catch (err) {
        dispatch(
          setSnackBar({
            msg: err.message,
            severity: "error",
          })
        );
      }
    }

    if (selected?._id) {
      loadMessages();
    }
  }, [selected]);

  useEffect(() => {
    if (socket) {
      socket.on(events.NEW_MESSAGE, (message) => {
        console.log("got new message in chatactive");
        setMessages((msgs) => [...msgs, message]);
      });
      socket.on(events.TYPING, ({ typing, roomId }) => {
        console.log("got typing event in chatactive");
        // TODO:
        // typing is either true or false
      });
    }
  }, [socket]);

  if (!selected?._id) {
    return null;
  }

  function handleChange(e) {
    console.log("emitting TYPING event, id: ", selected._id);
    socket.emit(events.TYPING, {
      typing: Boolean(e.target.value),
      roomId: selected?._id,
    });
    formik.handleChange(e);
  }

  async function handleSubmit(values) {
    try {
      const msg = await dispatch(sendMessage(values.chatInput, selected._id));
      setMessages((msgs) => [...msgs, msg]);
      formik.resetForm();
    } catch (err) {
      dispatch(
        setSnackBar({
          msg: err.message,
          severity: "error",
        })
      );
    }
  }

  return (
    <Grid
      container
      item
      xs={12}
      direction="column"
      // className={`${classes.activeChat} ${debugClasses.root}`}
      className={classes.activeChat}
    >
      <Header username={username} participants={selected.participants} />
      <Grid item xs className={classes.messages}>
        {messages.map((msg) => (
          <Message key={msg._id} sender={msg.sender} date={msg.date}>
            {msg.message}
          </Message>
        ))}
        {/* // TODO: add typers here */}
      </Grid>
      <Grid container item className={classes.input}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="chatInput"
            value={formik.values.chatInput}
            fullWidth
            variant="outlined"
            placeholder="Type something..."
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SentimentSatisfiedOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </Grid>
  );
}
