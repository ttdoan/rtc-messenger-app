import events from "../common/events";

class WebSockets {
  constructor() {
    // NOTE: For production, probably better to replace with Redis to reduce
    // server memory usage.
    this.online = [];
  }

  connection(socket) {
    console.log("socket connected");
    console.log("this first: ", this.online);

    socket.on("disconnect", () => {
      this.online = this.online.filter((user) => user.socket.id !== socket.id);
    });

    socket.on(events.CONNECT, ({ username }) => {
      console.log("received CONNECT event. username: ", username);
      // console.log("this: ", this);
      this.online.push({
        username,
        socket,
      });

      // roomIds.forEach((id) => socket.join(id));
    });
  }
}

const instance = new WebSockets();
console.log("instance: ", instance.online);

export default instance;
