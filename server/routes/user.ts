import express from "express";

import { info, edit, changepass, myOrders } from "../controllers/user";

import { checkAuth } from "../utils/auth";

const router = express.Router();

router.get("/info", checkAuth, info);
router.get("/order", checkAuth, myOrders);
router.patch("/edit", checkAuth, edit);
router.patch("/changepass", checkAuth, changepass);

export default router;
