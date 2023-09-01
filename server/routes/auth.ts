import express from "express";

import { check } from "express-validator";

import {
  login,
  register,
  refreshToken,
  logout,
  confirm,
} from "../controllers/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check(
      "name",
      "This field must contain between 10 to 20 characters"
    ).isLength({
      min: 2,
      max: 40,
    }),
    check(
      "password",
      "This field must contain between 7 to 16 characters"
    ).isLength({
      min: 7,
      max: 16,
    }),
  ],
  login
);
router.post(
  "/register",
  [
    check(
      "name",
      "This field must contain between 10 to 20 characters"
    ).isLength({
      min: 2,
      max: 40,
    }),
    check("email", "Invalid format").isEmail().isLength({ max: 130 }),
    check(
      "password",
      "This field must contain between 7 to 16 characters"
    ).isLength({
      min: 7,
      max: 16,
    }),
  ],
  register
);
router.post("/confirm", confirm);
router.get("/refreshToken", refreshToken);
router.post("/logout", logout);

export default router;
