import mongoose from "mongoose";
import moment from "moment";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  readBy: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

messageSchema.statics.createMessage = async function (params) {
  const { sender, message, roomId } = params;

  // TODO: find who's online and determined readBy
  // const onlineUsers = participants.filter((username) =>
  //   global.online.includes(username)
  // );

  const msg = await this.create({
    roomId,
    sender,
    readBy: [],
    date: moment().format("MMM Do YYYY, h:mm a"),
    message,
  });

  return msg;
};

const Message = mongoose.model("Message", messageSchema);
export default Message;
