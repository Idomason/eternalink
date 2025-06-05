import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelEventRegistration,
  getUserEvents,
} from "../controllers/event.controller";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected routes
router.post("/", auth, createEvent);
router.patch("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

// Registration routes
router.post("/:id/register", auth, registerForEvent);
router.post("/:id/cancel", auth, cancelEventRegistration);
router.get("/user/registered", auth, getUserEvents);

export default router;
