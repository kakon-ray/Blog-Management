import express from "express";
import validateRequest from "../../middlware/validateRequest";
import auth from "../../middlware/auth";
import { USER_ROLE } from "./user.contant";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(UserValidation.loginValidationSchema),
  UserController.loginUser
);

// This route work only admin

router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  UserController.blockUser
);

export const UserRoutes = router;
