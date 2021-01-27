import jwt from "jsonwebtoken";
import config from "./config";
import createError from "http-errors";

const DEFAULT_SECRET = "secret";

function createAccessToken(payload) {
  if (process.env.NODE_ENV === "production" && !process.env.ACCESS_SECRET) {
    return null;
  }

  return jwt.sign(payload, process.env.ACCESS_SECRET || DEFAULT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + config.ACCESS_AUTH_EXP,
  });
}

// Middleware for authenticating JWT token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [authType, token] = authHeader.split(" ");
    if (authType === "Basic") {
      if (process.env.NODE_ENV === "production" && !process.env.ACCESS_SECRET) {
        console.error("ACCESS_SECRET is not defined!");
        process.exit();
      }

      jwt.verify(
        token,
        process.env.ACCESS_SECRET || DEFAULT_SECRET,
        (err, decoded) => {
          if (err) {
            return next(createError(403, "Unauthorized acess."));
          }

          req.user = decoded;
          return next();
        }
      );
    } else {
      // Incorrect token type
      return next(createError(401, "Unauthorized access."));
    }
  } else {
    return next(createError(401, "Unauthorized access."));
  }
}

export default { createAccessToken, authenticate };
