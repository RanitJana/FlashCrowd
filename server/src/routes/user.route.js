import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/auth.controller.js";

router.route("/login").post(handleLogin);

export default router;
