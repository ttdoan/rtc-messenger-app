import User from "../models/User";
import ChatRoom from "../models/ChatRoom";
import Message from "../models/Message";
import createError from "http-errors";
import events from "../../common/events";

async function search(req, res, next) {
  try {
    const { username } = req.user;

    const rooms = await ChatRoom.find({
      participants: username,
    });

    return res.status(200).json({ rooms });
  } catch (err) {
    return next(
      createError(
        500,
        "An unexpected error occurred when trying to post a message."
      )
    );
  }
}

async function initiate(req, res, next) {
  const { participants } = req.body;
  const { username } = req.user;

  try {
    // First you have to check the authenticity of the usernames.
    const users = await User.find({
      username: {
        $in: participants,
      },
    });

    if (users.length !== participants.length) {
      return createError(400, "Invalid usernames!");
    }

    const { created, room } = await ChatRoom.openRoom(username, participants);
    if (created) {
      return res.status(201).json({ room });
    } else {
      return res.status(200).json({ room });
    }
  } catch (err) {
    next(
      createError(
        500,
        "An unexpected error occurred when trying to open chat room."
      )
    );
  }
}

async function getMessages(req, res, next) {
  const { roomId } = req.params;
  const { username } = req.user;

  try {
    // TODO: check to see if the room contains the user requesting the messages. This prevents
    // a stranger from using his/her token to request messages of rooms he/she is not in...

    const messages = await Message.find({
      roomId,
    });
    return res.status(200).json({ messages });
  } catch (err) {
    console.log("err: ", err);
    return next(
      createError(
        500,
        "An unexpected error occurred when trying to post a message."
      )
    );
  }
}

async function postMessage(req, res, next) {
  const { sender, message } = req.body;
  const { roomId } = req.params;

  try {
    // TODO: first, check to make sure that the sender is part of the chatroom. If
    // not, then throw an error

    const msg = await Message.createMessage({
      sender,
      message,
      roomId,
    });

    for (let i = 0; i < global.online.length; i++) {
      if (global.online[i].username === sender) {
        const socket = global.online[i].socket;
        socket.to(roomId).emit(events.NEW_MESSAGE, msg);
        break;
      }
    }
    // global.io.online.socket[sender].broadcast.emit(events.NEW_MESSAGE, msg);

    return res.status(201).json({ message: msg });
  } catch (err) {
    console.log("err: ", err);
    return next(
      createError(
        500,
        "An unexpected error occurred when trying to post a message."
      )
    );
  }
}

export default { search, initiate, getMessages, postMessage };
