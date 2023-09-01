import express, { Request, Response } from "express";
const router = express.Router();

import { check, validationResult } from "express-validator";

import { sendEmail } from "../utils/email";
import { errorSort } from "../utils/errors";
import { recapValidate } from "../utils/recapVerif";

router.post(
  "/send",
  [
    check("email", "Invalid format").isEmail().isLength({ max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 2,
      max: 40,
    }),
    check("phone", "Invalid format").isLength({
      min: 10,
      max: 10,
    }),
    check(
      "message",
      "Message must contain between 150 to 3000 characters"
    ).isLength({
      min: 150,
      max: 3000,
    }),
  ],
  async (req: Request, res: Response) => {
    const { name, email, phone, message, recapToken } = req.body;

    try {
      const recapValid = await recapValidate(recapToken);

      if (!recapValid) {
        return res.status(404).json("Validation failed");
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = errorSort(errors.mapped());

        return res.status(400).json(err);
      }

      await sendEmail({
        email: process.env.INBOUND_EMAIL as string,
        subject: `Message from ${name}`,
        content: `                  
            <div style="padding: 10px 0;padding-left: 10px;">
              <h4 style="display: inline;color: #d9d9d9;">Name:</h4>
              <span style="color: #fff;">${name}</span>
            </div>
            <div style="padding: 10px 0;padding-left: 10px;">
              <h4 style="display: inline;color: #d9d9d9;">Email:</h4>
              <span style="color: #fff;text-decoration: none">${email}</span>
            </div>
            <div style="padding: 10px 0;padding-left: 10px;">
              <h4 style="display: inline;color: #d9d9d9;">Phone:</h4>
              <span style="color: #fff;">${phone}</span>
            </div>
            <div style="padding: 10px 0;padding-left: 10px;">
              <h4 style="display: inline;color: #d9d9d9;">Message:</h4>
              <p style=" 
                color: "#fff" 
                margin: 0;
                display: inline;
                line-height: 20px;
              ">${message}</p>
            </div>
          `,
      });

      return res
        .status(200)
        .json(
          "Your message has been sent, it will be reviewed as soon as possible"
        );
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
