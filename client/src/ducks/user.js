// Actions
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

// Action Creators
export const logIn = (username, token, color) => ({
  type: LOGIN,
  username,
  token,
  color,
});

export const logOut = () => ({
  type: LOGOUT,
});

// Reducers
const INITIAL_STATE = {
  username: "",
  token: null,
  color: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        color: action.color,
      };

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
