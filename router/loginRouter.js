// external imports
import express from "express";

// internal imports
import { getLogin } from "../controller/loginController.js";

const router = express.Router();

// login page
router.get("/", getLogin);

export default router; 