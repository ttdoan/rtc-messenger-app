import { postRequest, getAuthRequest } from "./httpServices";
import { setLoading, setSnackBar } from "../ducks/site";
import { logIn, logOut } from "../ducks/user";

function signup(username, email, password) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      await postRequest("/users/signup", {
        username,
        email,
        password,
      });
    } catch (err) {
      throw new Error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

function login(email, password) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { accessToken, username, color } = await postRequest(
        "/users/login",
        { email, password }
      );
      dispatch(logIn(username, accessToken, color));
    } catch (err) {
      throw new Error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

function logout() {
  return (dispatch) => {
    dispatch(logOut());
  };
}

function searchUsernames(name) {
  return async (dispatch, getState) => {
    let usernames = [];

    try {
      ({ usernames } = await getAuthRequest(
        "/users",
        { name },
        getState().user.token
      ));
    } catch (err) {
      dispatch(
        setSnackBar({
          msg: err.message,
          severity: "error",
        })
      );
    }

    return usernames;
  };
}

export { signup, login, logout, searchUsernames };
