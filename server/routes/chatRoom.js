import express from "express";
import jwt from "../jwtUtils";
import chatRoomController from "../controllers/chatRoom";
import { body, param, query } from "express-validator";
import { validateRequest } from "../middlewares/validation";

const router = express.Router();

// Get all conversations by username
router.get(
  "/",
  jwt.authenticate,
  query("username").exists().isString(),
  chatRoomController.search
);

router.post(
  "/initiate",
  jwt.authenticate,
  body("participants").exists().isArray({ min: 1 }),
  body("creator").exists().isString(),
  validateRequest,
  chatRoomController.initiate
);

router.post(
  "/:roomId/message",
  jwt.authenticate,
  body("sender").isString().exists(),
  body("message").isString().exists(),
  param("roomId").isString().exists(),
  validateRequest,
  chatRoomController.postMessage
);

router.get(
  "/:roomId/messages",
  jwt.authenticate,
  param("roomId").isString().exists(),
  chatRoomController.getMessages
);

// Can only delete the chat if you're the creator
router.delete("/:chatRoomId", () => {});

// Delete a single message in chat room for user
router.delete("/:ChatRoomId/messages/:messageId", () => {});

// Delete all messages for a user
router.delete("/:chatRoomId/messages", () => {});

export default router;
