// external imports
import express from "express";

// internal imports
import { getInbox } from "../controller/inboxController.js";

const router = express.Router();

// inbox page
router.get("/", getInbox);

export default router 