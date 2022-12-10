// external imports
import express from "express";

// internal imports
import { getLogin, login, logout } from "../controller/loginController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";
import { doLoginValidators, doLoginValidationHandler } from "../middlewares/login/loginValidators.js";
import { redirectLoggedIn } from "../middlewares/common/checkLogin.js";

const router = express.Router();

// set page title
const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout
router.delete("/", logout);

export default router;  