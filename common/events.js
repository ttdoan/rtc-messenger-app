// Events for Socket.io, shared by both client and server
function _prefix(str) {
  return `socket/${str}`;
}

// When a user logs on, the user emits this event to be considered online.
const CONNECT = _prefix("CONNECT");
// The user emits this event when posting a message.
const NEW_MESSAGE = _prefix("NEW_MESSAGE");
// The user automatically emits this event to monitor any new messages from
// any ongoing conversations.
const JOIN_ROOM = _prefix("JOIN_ROOM");
// The user emits this event when he/she is in the middle of typing a message.
const TYPING = _prefix("TYPING");

module.exports = { CONNECT, NEW_MESSAGE, JOIN_ROOM, TYPING };
