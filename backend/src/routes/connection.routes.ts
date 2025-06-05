import express from "express";
import { auth } from "../middleware/auth.middleware";
import {
  getConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  removeConnection,
} from "../controllers/connection.controller";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all connections for the authenticated user
router.get("/", getConnections);

// Send a connection request
router.post("/request/:userId", sendConnectionRequest);

// Accept a connection request
router.post("/accept/:userId", acceptConnectionRequest);

// Reject/remove a connection
router.delete("/:userId", removeConnection);

export default router;
