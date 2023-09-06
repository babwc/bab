import { Request, Response } from "express";
import { validationResult } from "express-validator";

import crypto from "crypto";

import ShortUniqueId from "short-unique-id";

import { addImage, getImgUrl, deleteImgS3 } from "../utils/s3";

import Catering from "../model/Catering";

import { sendEmail } from "../utils/email";

import { recapValidate } from "../utils/recapVerif";

export const some = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    const catering = await Catering.find({ category })
      .select("-category -__v -updatedAt -createdAt")
      .lean();

    for (const dish of catering) {
      if (dish.image) {
        const imageUrl = await getImgUrl(dish.image);

        dish.imageUrl = imageUrl;
      }
    }

    return res.status(200).json(catering);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const add = async (req: Request, res: Response) => {
  const { name, category, description } = req.body;

  try {
    const uid = new ShortUniqueId({ length: 10 });

    const imgName = crypto.randomBytes(32).toString("hex");

    if (req.file) {
      await addImage(imgName, req.file.buffer, req.file.mimetype);
    }

    const newCateringDish = new Catering({
      id: uid(),
      name,
      category,
      image: imgName,
      description,
    });

    await newCateringDish.save();

    newCateringDish.category = category._id;

    return res.status(201).json("Catering dish has been successfully created");
  } catch (error) {
    console.log(error);

    return res.status(500).json("Something went wrong");
  }
};

export const remove = async (req: Request, res: Response) => {
  const { uid } = req.body;
  console.log(uid);

  try {
    const catering = await Catering.findOneAndDelete({ uid });

    if (!catering) return res.status(404).json("Catering dish is not found");

    if (catering.image) {
      await deleteImgS3(catering.image);
    }

    return res.status(201).json("Catering dish has been deleted");
  } catch (error) {
    console.log(error);

    return res.status(500).json("Something went wrong");
  }
};

export const send = async (req: Request, res: Response) => {
  const { name, email, phone, location, date, guests, message, recapToken } =
    req.body;

  try {
    const recapValid = await recapValidate(recapToken);

    if (!recapValid) {
      return res.status(404).json("Validation failed");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    await sendEmail({
      email: process.env.INBOUND_EMAIL as string,
      subject: `Catering request`,
      content: `
        <div style="padding: 10px 0;padding-left: 10px;">
          <h4 style="display: inline;color: #d9d9d9;">Name:</h4>
          <span style="color: #fff;">${name}</span>
        </div>
        <div style="padding: 10px 0;padding-left: 10px;color: #fff;text-decoration: none">
          <h4 style="display: inline;color: #d9d9d9 !important;">Email:</h4>
          <span style="color: #fff;text-decoration: none">${email}</span>
        </div>
        <div style="padding: 10px 0;padding-left: 10px;">
          <h4 style="display: inline;color: #d9d9d9;">Phone:</h4>
          <span style="color: #fff;">${phone}</span>
        </div>
        <div style="padding: 10px 0;padding-left: 10px;">
          <h4 style="display: inline;color: #d9d9d9;">Guests:</h4>
          <span style="color: #fff;">${guests}</span>
        </div>
        <div style="padding: 10px 0;padding-left: 10px;">
          <h4 style="display: inline;color: #d9d9d9;">Location:</h4>
          <span style="color: #fff;">${location}</span>
        </div>
        <div style="padding: 10px 0;padding-left: 10px;">
          <h4 style="display: inline;color: #d9d9d9;">Date:</h4>
          <span style="color: #fff;">${date}</span>
        </div>
        ${
          message
            ? `
            <div style="padding: 10px 0;padding-left: 10px;">
              <h4 style="display: inline;color: #d9d9d9;">Message:</h4>
              <p style=" 
                color: #fff;
                margin: 0;
                display: inline;
                line-height: 20px;
              ">${message}</p>
            </div>
            `
            : ""
        }
      `,
    });

    return res
      .status(200)
      .json(
        "Your catering request has been sent, it will be reviewed as soon as possible"
      );
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
