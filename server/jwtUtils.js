import jwt from "jsonwebtoken";
import config from "./config";

function createAccessToken(payload) {
  if (process.env.NODE_ENV === "production" && !process.env.ACCESS_SECRET) {
    return null;
  }

  return jwt.sign(payload, process.env.ACCESS_SECRET || "secret", {
    expiresIn: Math.floor(Date.now() / 1000) + config.ACCESS_AUTH_EXP,
  });
}

export default { createAccessToken };
