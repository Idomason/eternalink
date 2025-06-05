import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user.model";

interface JwtPayload {
  _id: string;
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

    // Type assertion to ensure TypeScript knows user is IUser
    (req as Request & { user: IUser }).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};
