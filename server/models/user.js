import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import validator from "validator";
import { iconColor } from "./common";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (val) => validator.isEmail(val),
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  // TODO: for now, only accepting a (random) color for icon
  color: {
    type: String,
    required: true,
  },
});

userSchema.statics.validatePassword = function (hash, salt, password) {
  return (
    hash ===
    crypto
      .pbkdf2Sync(
        password,
        salt + process.env.STATIC_SALT,
        10000,
        512,
        "sha512"
      )
      .toString("hex")
  );
};

userSchema.statics.createUser = async function (username, email, password) {
  const users = await User.find({ $or: [{ email }, { username }] });
  if (users.length) {
    if (email === users[0].email) {
      throw new Error("Email already exists!");
    }

    throw new Error("Username already exists!");
  } else {
    // Create dynamic salt
    const salt = crypto.randomBytes(16).toString("hex");
    // Create hashed password based on static and dynamic salts
    const hash = crypto
      .pbkdf2Sync(
        password,
        salt + process.env.STATIC_SALT,
        10000,
        512,
        "sha512"
      )
      .toString("hex");
    const color =
      iconColor[Math.floor(Math.random() * Math.floor(iconColor.length))];

    this.create({
      username,
      email,
      password: hash,
      salt,
      color,
    });
  }
};

userSchema.statics.searchForUsernames = async function (self, name) {
  const users = await User.find(
    {
      $and: [
        {
          username: {
            $regex: new RegExp(name),
          },
        },
        {
          username: { $ne: self },
        },
      ],
    },
    { _id: false, username: true }
  );

  return users.map((user) => user.username);
};

userSchema.statics.checkUsernamesExist = async function () {};

const User = mongoose.model("User", userSchema, "users");
export default User;
