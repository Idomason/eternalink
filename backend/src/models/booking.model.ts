import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "momo";
  momoNumber: string;
  momoProvider: "mtn" | "vodafone" | "airtelTigo";
  momoTransactionId?: string;
  amountPaid: number;
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["momo"],
      default: "momo",
      required: true,
    },
    momoNumber: {
      type: String,
      required: true,
    },
    momoProvider: {
      type: String,
      enum: ["mtn", "vodafone", "airtelTigo"],
      required: true,
    },
    momoTransactionId: {
      type: String,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
bookingSchema.index({ user: 1, event: 1 }, { unique: true });
bookingSchema.index({ paymentStatus: 1 });

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
