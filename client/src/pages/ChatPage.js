import React, { useEffect, useState } from "react";
import ChatSideBar from "../components/ChatSideBar";
import ChatActive from "../components/ChatActive";
import { SelectedContext, SocketProvider } from "../context";

// Material UI
import Grid from "@material-ui/core/Grid";

export default function ChatPage() {
  const [selected, setSelected] = useState({});

  return (
    <SocketProvider>
      <SelectedContext.Provider value={{ selected, setSelected }}>
        <Grid container>
          <Grid item xs={4}>
            <ChatSideBar />
          </Grid>
          <Grid item xs={8}>
            <ChatActive />
          </Grid>
        </Grid>
      </SelectedContext.Provider>
    </SocketProvider>
  );
}
