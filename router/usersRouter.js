// external imports
import express from "express";

// internal imports
import { getUsers } from "../controller/usersController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

export default router