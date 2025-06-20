import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/auth.controller.js";

router.route("/").post(handleLogin);

export default router;
