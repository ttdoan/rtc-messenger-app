import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import validator from "validator";

const schema = new Schema({
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
});

schema.methods.createHash = function (password) {
  // Create dynamic salt
  this.salt = crypto.randomBytes(16).toString("hex");
  // Create hashed password based on static and dynamic salts
  this.password = crypto
    .pbkdf2Sync(
      password,
      this.salt + process.env.STATIC_SALT,
      10000,
      512,
      "sha512"
    )
    .toString("hex");
};

schema.statics.validatePassword = function (hash, salt, password) {
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

const User = mongoose.model("User", schema, "users");
export default User;
