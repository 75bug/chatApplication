// external imports
import express from "express";

// internal imports
import { getUsers } from "../controller/usersController.js";

const router = express.Router();

// users page
router.get("/", getUsers);

export default router