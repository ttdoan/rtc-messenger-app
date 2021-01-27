import { getAuthRequest, postAuthRequest } from "./httpServices";

function getConversationsForUser() {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    const { rooms } = await getAuthRequest("/chatrooms", null, token);
    return rooms;
  };
}

function initiateConversation(participants) {
  return async (dispatch, getState) => {
    const { username, token } = getState().user;
    const { room } = await postAuthRequest(
      "/chatrooms/initiate",
      {
        participants: [...participants, username],
        creator: username,
      },
      token
    );

    return room;
  };
}

function getMessages(roomId) {
  return async (dispatch, getState) => {
    const { token } = getState().user;
    const { messages } = await getAuthRequest(
      `/chatrooms/${roomId}/messages`,
      null,
      token
    );
    return messages;
  };
}

function sendMessage(msg, roomId) {
  return async (dispatch, getState) => {
    const { username, token } = getState().user;
    const { message } = await postAuthRequest(
      `/chatrooms/${roomId}/message`,
      {
        sender: username,
        message: msg,
        roomId,
      },
      token
    );

    return message;
  };
}

export {
  getConversationsForUser,
  initiateConversation,
  getMessages,
  sendMessage,
};
