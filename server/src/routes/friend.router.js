import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMyFriends, searchFriends } from "../controllers/friend.controller.js";


router.route("/").get(verifyJWT, getMyFriends);
router.route("/search").get(verifyJWT, searchFriends);


export default router;
