import express from "express";
import jwt from "../jwtUtils";
import User from "../models/user";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  max: 5,
});

const router = express.Router();

router.post("/signup", (req, res) => {
  const errors = [];
  const { username, email, password } = req.body;

  if (!username) {
    errors.push("Username is required!");
  }
  if (!email) {
    errors.push("Email is required!");
  }
  if (!password) {
    errors.push("Password is required!");
  }
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  let user = new User({
    username,
    email,
    password,
  });

  User.find({ email }, async (err, result) => {
    if (result.length === 0) {
      user.createHash(password);
      const savedUser = await user.save();
      if (savedUser === user) {
        return res.status(200);
      } else {
        return res.status(201).json();
      }
    } else {
      return res.status(400).json({
        message: `Email ${email} already exists!`,
      });
    }
  });
});

router.get("/login", limiter, (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email) {
    errors.push("Email is required!");
  }
  if (!password) {
    errors.push("Password is required!");
  }

  if (errors.length) {
    return res.status(201).json({ errors });
  }

  try {
    (async () => {
      const result = await User.findOne({ email });
      const error = "Either email or password is incorrect.";

      if (!result) {
        throw new Error(error);
      } else {
        if (!User.validatePassword(result.password, result.salt, password)) {
          throw new Error(error);
        }

        const payload = {
          username: result.username,
        };
        const accessToken = jwt.createAccessToken(payload);
        if (!accessToken) {
          return res.status(500).json({
            error: "An error occurred when attempting to log the user in.",
          });
        }

        return res.status(200).json({
          accessToken,
        });
      }
    })();
  } catch (error) {
    console.log("INSIDE CATCH");
    return res.status(401).json({ error });
  }
});

export default router;
