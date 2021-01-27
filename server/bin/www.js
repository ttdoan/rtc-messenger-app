import app from "../app";
import http from "http";
import dotenv from "dotenv";
import io from "socket.io";
// TODO: need to fix later...
// import WebSockets from "../WebSockets";
import events from "../../common/events";

/* Sets up the environment variables from your .env file*/
dotenv.config();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Initiate socket connection
 */

global.online = [];
global.io = io(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// global.io.on("connection", WebSockets.connection);
global.io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    global.online = global.online.filter(
      (user) => user.socket.id !== socket.id
    );
  });

  socket.on(events.CONNECT, ({ username }) => {
    console.log("Connected user: ", username);
    global.online.push({
      username,
      socket,
    });
  });

  socket.on(events.JOIN_ROOM, (room) => {
    console.log("user is trying to connect to rooms: ", room);
    socket.join(room);
  });

  socket.on(events.TYPING, ({ typing, roomId }) => {
    socket.to(roomId).emit(events.TYPING, { typing, roomId });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  console.log("Listening on " + bind);
}
