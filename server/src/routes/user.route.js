import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/auth.controller.js";

router.route("/").post(registerUser);

export default router;
