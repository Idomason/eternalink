import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "elder" | "caregiver" | "volunteer" | "admin";
  profilePicture?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  interests?: string[];
  skills?: string[];
  needsAssistance?: boolean;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["elder", "caregiver", "volunteer", "admin"],
      required: true,
    },
    profilePicture: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    interests: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    needsAssistance: {
      type: Boolean,
      default: false,
    },
    emergencyContact: {
      name: String,
      phoneNumber: String,
      relationship: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
