import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import UserPanel from "../components/UserPanel";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Chat from "../components/Chat";
import { useFontStyles, useDebugStyles } from "../styles";
import { searchUsernames } from "../services/userServices";
import {
  getConversationsForUser,
  initiateConversation,
} from "../services/chatRoomServices";
import { setSnackBar } from "../ducks/site";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SelectedContext } from "../context";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    padding: "5%",
    height: "100%",
    backgroundColor: "#F5F7FB",
  },
  sidebarItem: {
    marginBottom: "3%",
  },
  title: {
    fontSize: "20px",
  },
  defaultMsg: {
    color: "#91A3C0",
  },
}));

function ContentMessage({ children }) {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  return (
    <Grid item xs={10}>
      <Typography
        align="center"
        className={`${fontClasses.general} ${classes.defaultMsg}`}
      >
        {children}
      </Typography>
    </Grid>
  );
}

function ChatSideBarItem({ children, ...rest }) {
  const classes = useStyles();

  return (
    <Grid className={classes.sidebarItem} {...rest}>
      {children}
    </Grid>
  );
}

export default function ChatSideBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const debugClasses = useDebugStyles();
  const defaultContent = (
    <ContentMessage>
      You don&apos;t have any contacts yet. Invite others to start chatting!
    </ContentMessage>
  );
  const searchBarRef = useRef(null);

  const { username } = useSelector((state) => state.user);
  const [content, setContent] = useState(defaultContent);
  const [chats, setChats] = useState([]);
  const { setSelected } = useContext(SelectedContext);

  // TODO: need to update for accommodates for rooms instead of only 1:1 chats
  function _createList(chats) {
    return (
      <Grid item xs style={{ height: "100%" }}>
        <List>
          {chats.map((chat) => (
            <Chat
              key={chat._id + chat.participants.toString()}
              id={chat._id}
              creator={chat.creator}
              participants={chat.participants}
              color={chat.color}
              handleClick={startChat}
            />
          ))}
        </List>
      </Grid>
    );
  }

  function addExistingToFront(id, conversations) {
    const tmp = [...conversations];
    const idx = tmp.findIndex((chat) => chat._id === id);
    tmp.unshift(...tmp.splice(idx, 1));
    return tmp;
  }

  async function handleSubmitSearch(values) {
    setContent(<Loader />);

    const { search: name } = values;
    const usernames = await dispatch(searchUsernames(name));
    if (!usernames.length) {
      setContent(<ContentMessage>No users found!</ContentMessage>);
    } else {
      setContent(
        _createList(
          usernames.map((name) => ({
            creator: username,
            participants: [name],
          }))
        )
      );
    }
  }

  function handleCloseSearch() {
    // display previous content
    if (chats.length) {
      setContent(_createList(chats));
    } else {
      setContent(defaultContent);
    }
  }

  // If a conversation already has an ID, then it means the conversation is already
  // added to the sidebar, so the user is selecting it. Conversely, if a conversation
  // doesn't have an ID, it means it's a search result.
  async function startChat(id, creator, participants) {
    if (!id) {
      try {
        const conversation = await dispatch(initiateConversation(participants));
        const existingChat = chats.find((chat) => chat.id === conversation._id);
        if (existingChat) {
          const updatedChats = addExistingToFront(existingChat._id, chats);
          setSelected(updatedChats[0]);
          setChats(updatedChats);
        } else {
          const updatedChats = [conversation, ...chats];
          setChats(updatedChats);
          setSelected(conversation);

          dispatch(
            setSnackBar({
              msg: "Added conversation successfully!",
              severity: "success",
            })
          );
        }
      } catch (err) {
        dispatch(
          setSnackBar({
            msg: err.message,
            severity: "error",
          })
        );
      }
    } else {
      const updatedChats = addExistingToFront(id, chats);
      setSelected(updatedChats[0]);
      setChats(updatedChats);
    }

    searchBarRef.current.handleClose();
  }

  useEffect(() => {
    async function getOngoingConversations() {
      try {
        const conversations = await dispatch(getConversationsForUser());

        if (!conversations.length) {
          setContent(defaultContent);
        } else {
          setContent(_createList(conversations));
          setChats(conversations);
        }
      } catch (err) {
        dispatch(
          setSnackBar({
            msg: err.message,
            severity: "error",
          })
        );
      }
    }

    getOngoingConversations();
  }, []);

  useEffect(() => {
    // Content created components with a reference to startChat callback, which
    // will reference a SNAPSHOT of the state "chats". However, content doesn't
    // always re-render when chats update, thus the startChat callback will
    // reference old "chats" value. Using this to keep content and chats in sync.
    setContent(_createList(chats));
  }, [chats]);

  return (
    <Grid container className={classes.sidebar} direction="column">
      <ChatSideBarItem item>
        <UserPanel />
      </ChatSideBarItem>
      <ChatSideBarItem item>
        <Typography
          className={`${fontClasses.base} ${fontClasses.bold} ${classes.title}`}
        >
          Chats
        </Typography>
      </ChatSideBarItem>
      <ChatSideBarItem>
        <SearchBar
          ref={searchBarRef}
          handleSubmit={handleSubmitSearch}
          handleClose={handleCloseSearch}
        />
      </ChatSideBarItem>
      <Grid
        container
        item
        justify="center"
        alignContent="center"
        xs
        // className={debugClasses.root}
      >
        {content}
      </Grid>
    </Grid>
  );
}
