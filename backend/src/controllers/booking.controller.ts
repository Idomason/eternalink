import { Request, Response } from "express";
import { Booking } from "../models/booking.model";
import { Event } from "../models/event.model";
import { IUser } from "../models/user.model";

// Define RequestWithUser interface
interface RequestWithUser extends Request {
  user?: IUser;
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, paymentMethod, momoNumber } = req.body;
    const userId = (req as RequestWithUser).user?._id;

    // Check if event exists and has capacity
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user already has a booking for this event
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    const booking = new Booking({
      user: userId,
      event: eventId,
      paymentMethod,
      momoNumber: paymentMethod === "momo" ? momoNumber : undefined,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as RequestWithUser).user?._id;
    const bookings = await Booking.find({ user: userId })
      .populate("event")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
