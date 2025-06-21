import express from "express";
const router = express.Router();
import { createEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/").post(verifyJWT, createEvent);

export default router;
