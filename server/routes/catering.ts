import express from "express";
import multer from "multer";

import { check } from "express-validator";

import { add, send, some } from "../controllers/catering";

import { storage, checkFileType } from "../utils/multer";

import { checkAuth } from "../utils/auth";
import { isAdmin } from "../utils/admin";

const router = express.Router();

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post("/new", checkAuth, isAdmin, upload.single("image"), add);
router.get("/some", some);
router.post(
  "/send",
  [
    check("email", "Invalid format").isEmail().isLength({ max: 30 }),
    check("name", "Name length should be between 10 to 20 characters").isLength(
      {
        min: 2,
        max: 40,
      }
    ),
    check("phone", "Invalid format").isLength({
      min: 10,
      max: 10,
    }),
    check(
      "guests",
      "Guests length should be between 1 to 3 characters"
    ).isLength({
      min: 1,
      max: 3,
    }),
    check(
      "location",
      "Location length should be between 3 to 150 characters"
    ).isLength({
      min: 3,
      max: 150,
    }),
    check("date", "Date length should be no more than 150 characters").isLength(
      {
        max: 150,
      }
    ),
    check(
      "message",
      "Message must contain between 150 to 3000 characters"
    ).isLength({
      min: 150,
      max: 3000,
    }),
  ],
  send
);

export default router;
