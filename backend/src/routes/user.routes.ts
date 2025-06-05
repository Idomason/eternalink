import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { Event } from "../models/event.model";
import { auth } from "../middleware/auth.middleware";
import { IUser } from "../models/user.model";

const router = express.Router();

// Get user profile
router.get("/profile", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.patch("/profile", auth, async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: "Error updating profile" });
  }
});

// Get user events
router.get("/events", auth, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      $or: [{ organizer: req.user._id }, { participants: req.user._id }],
    })
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate("organizer", "firstName lastName email")
      .populate("participants", "firstName lastName email");

    const total = await Event.countDocuments({
      $or: [{ organizer: req.user._id }, { participants: req.user._id }],
    });

    res.status(200).json({
      events,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Join event
router.post(
  "/events/:eventId/join",
  auth,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const event = await Event.findById(req.params.eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      if (event.status !== "active") {
        return res.status(400).json({ error: "Event is not active" });
      }

      if (event.participants.length >= event.maxParticipants) {
        return res.status(400).json({ error: "Event is full" });
      }

      if (event.participants.includes(req.user._id)) {
        return res.status(400).json({ error: "Already joined this event" });
      }

      event.participants.push(req.user._id);
      await event.save();

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Leave event
router.post(
  "/events/:eventId/leave",
  auth,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const event = await Event.findById(req.params.eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      if (event.status !== "active") {
        return res.status(400).json({ error: "Event is not active" });
      }

      if (!event.participants.includes(req.user._id)) {
        return res.status(400).json({ error: "Not joined this event" });
      }

      event.participants = event.participants.filter(
        (participantId) => participantId.toString() !== req.user._id.toString()
      );
      await event.save();

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
