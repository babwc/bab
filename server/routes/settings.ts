import express from "express";

import { add, getAll, getOne, modidy } from "../controllers/settings";

const router = express.Router();

router.get("/all", getAll);
router.get("/one", getOne);
router.post("/add", add);
router.patch("/modify", modidy);

export default router;
