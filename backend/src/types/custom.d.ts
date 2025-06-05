import { IUser } from "../models/user.model";

// This is a module augmentation
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
