// Actions
const LOGIN = "LOGIN";

// Action Creators

export const logIn = (token) => ({
  type: LOGIN,
  token,
});

// Reducers
const INITIAL_STATE = {};
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, { ...state }, { token: action.token });

    default:
      return state;
  }
}
