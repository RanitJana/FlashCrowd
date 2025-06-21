import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEventNoti,
  createFriendRequestNoti,
} from "../controllers/notification.controller.js";

router.route("/friendReq").get(verifyJWT, createFriendRequestNoti);
router.route("/event").get(verifyJWT, createEventNoti);

export default router;
