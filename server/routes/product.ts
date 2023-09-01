import express from "express";
import multer from "multer";

import { checkAuth } from "../utils/auth";
import { isAdmin } from "../utils/admin";

import {
  all,
  search,
  some,
  many,
  add,
  one,
  deleteImg,
  edit,
  updateAvailability,
  remove,
} from "../controllers/product";

import { storage, checkFileType } from "../utils/multer";

const router = express.Router();

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/all", all);
router.post("/some", some);
router.post("/many", many);
router.post("/search", search);
router.get("/one", one);
router.post("/new", upload.single("image"), checkAuth, isAdmin, add);
router.patch("/edit", checkAuth, isAdmin, upload.single("image"), edit);
router.patch("/update-instock", checkAuth, isAdmin, updateAvailability);
router.delete("/delete", checkAuth, isAdmin, remove);
router.post("/delete-img", checkAuth, isAdmin, deleteImg);

export default router;
