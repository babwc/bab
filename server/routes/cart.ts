import express, { Request, Response } from "express";

import Product from "../model/Product";

import { getImgUrl } from "../utils/s3";

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

router.post("/images", async (req: Request, res: Response) => {
  const ids = req.body.ids;

  try {
    const images = await Product.find({ _id: { $in: ids } })
      .select("_id image")
      .lean();

    for (const product of images) {
      if (product.image) {
        const imageUrl = await getImgUrl(product.image);

        product.image = imageUrl;
      }
    }

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

export default router;
