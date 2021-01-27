import mongoose from "mongoose";
import { iconColor } from "./common";

// NOTE: We create a room regardless of whether its a 1:1 chat or with more people
// because the same API can be used in both situation.
//
// NOTE: We need to account for who created the chatroom because imagine with a
// room was started by a friend that's in a group of 5 for an event. Later, a different
// friend wants to create another room with the same group of friends for a different
// event. If the room creator is not accounted for, then the second friend won't be
// able to create a new room.
const chatRoomSchema = new mongoose.Schema({
  participants: {
    type: Array,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  // TODO: for now, only accepting a (random) color for icon
  color: {
    type: String,
    required: true,
  },
});

// TODO: need to account for creator in later update. See example above in NOTES.
chatRoomSchema.statics.openRoom = async function (creator, usernames) {
  const existingRoom = await this.findOne(
    {
      participants: {
        $all: usernames,
        $size: usernames.length,
      },
    },
    { __v: false }
  );

  if (existingRoom) {
    return {
      created: false,
      room: existingRoom,
    };
  }

  const color =
    iconColor[Math.floor(Math.random() * Math.floor(iconColor.length))];

  const newRoom = await this.create({
    participants: usernames,
    creator,
    color,
  });

  return {
    created: true,
    room: {
      _id: newRoom._id,
      participants: newRoom.participants,
      creator: newRoom.creator,
      color: newRoom.color,
    },
  };
};

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;
