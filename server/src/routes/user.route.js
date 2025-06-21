import express from "express";
const router = express.Router();
import { handleLogin, handleLogout } from "../controllers/auth.controller.js";

router.route("/login").post(handleLogin);
router.route("/logout").post(handleLogout);

export default router;
