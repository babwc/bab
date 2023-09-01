import express from "express";
import {
  add,
  addMultiple,
  addOne,
  one,
  remove,
  subtractOne,
} from "../controllers/cart";

import { checkAuth } from "../utils/auth";

const router = express.Router();

router.get("/one", checkAuth, one);
router.post("/add", checkAuth, add);
router.post("/add-one", checkAuth, addOne);
router.post("/add-multiple", checkAuth, addMultiple);
router.post("/subtract", checkAuth, subtractOne);
router.delete("/delete", checkAuth, remove);

export default router;
