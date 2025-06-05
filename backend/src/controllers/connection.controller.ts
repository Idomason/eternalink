import { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import mongoose from "mongoose";

// Define an interface for request with user
interface RequestWithUser extends Request {
  user?: IUser;
}

// Get all connections for the authenticated user
export const getConnections = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(authReq.user._id).populate("connections");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user's connections with their profiles
    const connections = await User.find({
      _id: { $in: user.connections },
    }).select(
      "firstName lastName email phoneNumber role profileImage createdAt"
    );

    // Get pending connection requests
    const pendingRequests = await User.find({
      _id: { $in: user.connectionRequests },
    }).select(
      "firstName lastName email phoneNumber role profileImage createdAt"
    );

    // Get sent connection requests
    const sentRequests = await User.find({
      connectionRequests: authReq.user._id,
    }).select(
      "firstName lastName email phoneNumber role profileImage createdAt"
    );

    res.status(200).json({
      connections,
      pendingRequests,
      sentRequests,
    });
  } catch (error: any) {
    console.error("Get connections error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send a connection request
export const sendConnectionRequest = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Can't connect to yourself
    if (userId === authReq.user._id.toString()) {
      return res.status(400).json({ error: "Cannot connect to yourself" });
    }

    // Check if already connected
    if (authReq.user.connections.includes(targetUser._id)) {
      return res.status(400).json({ error: "Already connected to this user" });
    }

    // Check if request already sent
    if (targetUser.connectionRequests.includes(authReq.user._id)) {
      return res.status(400).json({ error: "Connection request already sent" });
    }

    // Check if other user already sent a request
    if (authReq.user.connectionRequests.includes(targetUser._id)) {
      // Accept the request instead
      authReq.user.connectionRequests = authReq.user.connectionRequests.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );
      authReq.user.connections.push(targetUser._id);
      targetUser.connections.push(authReq.user._id);

      await authReq.user.save();
      await targetUser.save();

      return res.status(200).json({ message: "Connection established" });
    }

    // Add connection request
    targetUser.connectionRequests.push(authReq.user._id);
    await targetUser.save();

    res.status(200).json({ message: "Connection request sent" });
  } catch (error: any) {
    console.error("Send connection request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Accept a connection request
export const acceptConnectionRequest = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if request exists
    if (!authReq.user.connectionRequests.includes(targetUser._id)) {
      return res
        .status(400)
        .json({ error: "No connection request from this user" });
    }

    // Remove from requests and add to connections
    authReq.user.connectionRequests = authReq.user.connectionRequests.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );
    authReq.user.connections.push(targetUser._id);
    targetUser.connections.push(authReq.user._id);

    await authReq.user.save();
    await targetUser.save();

    res.status(200).json({ message: "Connection request accepted" });
  } catch (error: any) {
    console.error("Accept connection request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reject/remove a connection
export const removeConnection = async (req: Request, res: Response) => {
  try {
    const authReq = req as RequestWithUser;
    if (!authReq.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(authReq.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if it's a pending request
    if (user.connectionRequests.includes(targetUser._id)) {
      // Reject request
      user.connectionRequests = user.connectionRequests.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );
      await user.save();
      return res.status(200).json({ message: "Connection request rejected" });
    }

    // Remove connection
    user.connections = user.connections.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );
    targetUser.connections = targetUser.connections.filter(
      (id) => id.toString() !== user._id.toString()
    );

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "Connection removed" });
  } catch (error: any) {
    console.error("Remove connection error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
