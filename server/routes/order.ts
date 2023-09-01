import express from "express";

import {
  createPaymentIntent,
  confirm,
  getAll,
  accept,
  cancel,
} from "../controllers/order";
import { checkAuth } from "../utils/auth";
import { isAdmin } from "../utils/admin";

const router = express.Router();

router.get("/all", checkAuth, isAdmin, getAll);
router.patch("/accept", checkAuth, isAdmin, accept);
router.patch("/cancel", checkAuth, isAdmin, cancel);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/confirm", confirm);

export default router;
