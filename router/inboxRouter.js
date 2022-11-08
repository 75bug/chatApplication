// external imports
import express from "express";

// internal imports
import { getInbox } from "../controller/inboxController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const router = express.Router();

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

export default router 