// external imports
import express from "express";

// internal imports
import { getLogin } from "../controller/loginController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

export default router; 