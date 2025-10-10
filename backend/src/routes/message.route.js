import express from "express";
import {
  getAllContacts,
  getChatFriends,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetPortection } from "../middleware/arcjetMiddelware.js";

const router = express.Router();

router.use(arcjetPortection ,protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatFriends);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
