import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/booking.controller";

const router = express.Router();

// All booking routes require authentication
router.use(auth);

router.post("/", createBooking);
router.get("/my-bookings", getUserBookings);
router.patch("/:id/status", updateBookingStatus);
router.patch("/:id/cancel", cancelBooking);

export default router;
