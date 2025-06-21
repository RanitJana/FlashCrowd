import express from "express";
const router = express.Router();
import {
    addParticipant,
    createEvent,
    getHostedEvents,
    getOngoingEvents,
    getParticipatedEvents,
    getUpcomingEvents,
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/").post(verifyJWT, createEvent);
router.route("/hosted").get(verifyJWT, getHostedEvents);
router.route("/participated").get(verifyJWT, getParticipatedEvents);
router.route("/add-participant").put(verifyJWT, addParticipant);
router.route("/currEvent").get(getOngoingEvents);
router.route("/upcomingEvent").get(getUpcomingEvents);

export default router;
