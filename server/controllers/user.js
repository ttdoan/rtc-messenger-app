import User from "../models/User";
import jwt from "../jwtUtils";
import createError from "http-errors";

async function signup(req, res, next) {
  const { username, email, password } = req.body;

  try {
    await User.createUser(username, email, password);
    return res.status(201).send();
  } catch (err) {
    return next(createError(400, err.message));
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const result = await User.findOne({ email });
    const error = "Either email or password is incorrect.";

    if (!result) {
      throw new Error(error);
    } else {
      const { username, color } = result;

      if (!User.validatePassword(result.password, result.salt, password)) {
        throw new Error(error);
      }

      const payload = {
        username: result.username,
      };
      const accessToken = jwt.createAccessToken(payload);
      if (!accessToken) {
        return createError(
          500,
          "An error occurred when trying to log the user in."
        );
      }

      return res.status(200).json({
        accessToken,
        username,
        color,
      });
    }
  } catch (err) {
    return next(createError(401, err.message));
  }
}

async function search(req, res, next) {
  const { username } = req.user;
  const { name } = req.query;

  try {
    const usernames = await User.searchForUsernames(username, name);
    return res.status(200).json({ usernames });
  } catch (err) {
    return next(
      createError(
        500,
        "An unexpected error occurred during search for usernames."
      )
    );
  }
}

export default { signup, login, search };
