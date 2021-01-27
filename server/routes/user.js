import express from "express";
import jwt from "../jwtUtils";
import { body, query } from "express-validator";
import { validateRequest } from "../middlewares/validation";
import userController from "../controllers/user";

const router = express.Router();

// TODO: add some sanitization

// Search for usernames by name
router.get(
  "/",
  jwt.authenticate,
  query("name").exists(),
  validateRequest,
  userController.search
);

router.post(
  "/signup",
  body("username").exists(),
  body("email").exists().isEmail(),
  body("password").exists(),
  validateRequest,
  userController.signup
);

router.post(
  "/login",
  body("email").exists().isEmail(),
  body("password").exists(),
  validateRequest,
  userController.login
);

export default router;
