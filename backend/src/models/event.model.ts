import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  endTime: string;
  location: string;
  organizer: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  maxParticipants: number;
  eventType:
    | "echoes_expressions"
    | "rhythm_reminisce"
    | "spotlight_stories"
    | "create_compete"
    | "flavours_festivals"
    | "skill_sharing"
    | "other";
  image?: string;
  price: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        "echoes_expressions",
        "rhythm_reminisce",
        "spotlight_stories",
        "create_compete",
        "flavours_festivals",
        "skill_sharing",
        "other",
      ],
      default: "other",
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ eventType: 1 });

export const Event = mongoose.model<IEvent>("Event", eventSchema);
