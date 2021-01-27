import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { CONNECT } from "../../../common/events";

export const SocketContext = React.createContext(null);

export default function SocketProvider({ children }) {
  const { username } = useSelector((state) => state.user);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const WS =
      process.env.NODE_ENV === "production" ? "" : "ws://localhost:5000";
    const client = io.connect(WS);
    client.emit(CONNECT, {
      username,
    });
    setSocket(client);

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
