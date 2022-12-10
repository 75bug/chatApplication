// external imports
import express from "express";
import check from "express-validator";

// internal imports
import { getUsers, addUser, removeUser } from "../controller/usersController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";
import { avatarUpload } from "../middlewares/users/avatarUpload.js";
import { addUserValidators, addUserValidationHandler } from "../middlewares/users/userValidator.js";
import { checkLogin, requireRole } from "../middlewares/common/checkLogin.js";

const router = express.Router();

// users page
router.get(
    "/",
    decorateHtmlResponse("Users"),
    checkLogin,
    requireRole(["admin"]),
    getUsers
  );
  
  // add user
  router.post(
    "/",
    checkLogin,
    requireRole(["admin"]),
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
  );
  
  // remove user
  router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

export default router;