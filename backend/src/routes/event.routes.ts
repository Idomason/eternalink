import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected routes
router.post("/", auth, createEvent);
router.patch("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

export default router;
