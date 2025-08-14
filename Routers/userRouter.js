import express from "express";
import {
  forgotPassword,
  resetPassword,
  userLogin,
  userRegister,
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
