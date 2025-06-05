import { Request, Response } from "express";
import { Event } from "../models/event.model";
import { IUser } from "../models/user.model";

// Define an interface for request with user
interface RequestWithUser extends Request {
  user?: IUser;
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const event = new Event({
      ...req.body,
      organizer: authReq.user._id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Register for an event
export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.status !== "upcoming") {
      return res
        .status(400)
        .json({ error: "Event is not open for registration" });
    }

    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ error: "Event is full" });
    }

    // Check if user is already registered
    if (event.participants.includes(authReq.user._id)) {
      return res
        .status(400)
        .json({ error: "Already registered for this event" });
    }

    // Add user to participants
    event.participants.push(authReq.user._id);
    await event.save();

    res.status(200).json({ message: "Registration successful", event });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cancel registration for an event
export const cancelEventRegistration = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.status !== "upcoming") {
      return res
        .status(400)
        .json({ error: "Cannot cancel registration for this event" });
    }

    // Check if user is registered
    if (!event.participants.includes(authReq.user._id)) {
      return res.status(400).json({ error: "Not registered for this event" });
    }

    // Remove user from participants
    event.participants = event.participants.filter(
      (participantId) =>
        participantId.toString() !== authReq.user?._id.toString()
    );

    await event.save();

    res
      .status(200)
      .json({ message: "Registration cancelled successfully", event });
  } catch (error: any) {
    console.error("Cancellation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's registered events
export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const events = await Event.find({
      participants: authReq.user._id,
    }).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error: any) {
    console.error("Get user events error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
