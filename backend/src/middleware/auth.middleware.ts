import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";

// No need to import types file explicitly
// The declaration in express.d.ts is global

interface JwtPayload {
  _id: string;
}

// Define an interface for request with user
interface RequestWithUser extends Request {
  user?: IUser;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    // Use type assertion as a workaround
    (req as RequestWithUser).user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};
