require("dotenv").config();

import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { validationResult } from "express-validator";

import User from "../model/User";

import { createToken, decode } from "../utils/jwt";
import { sendEmail } from "../utils/email";
import { recapValidate } from "../utils/recapVerif";

import { JwtPayload } from "jsonwebtoken";
import { TokenData } from "../ts/interfaces";

const setTokens = (input: { id: string; name: string; email: string }) => {
  const accessToken = createToken(input, "1min");
  const refreshToken = createToken(input, "7d");

  return { accessToken, refreshToken };
};

const setCookies = (res: Response, token: string) => {
  const now = new Date();

  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(now.setDate(now.getDate() + 7)),
  });
};

export const login = async (req: Request, res: Response) => {
  const { name, password, recapToken } = req.body;

  try {
    const recapValid = await recapValidate(recapToken);

    if (!recapValid) {
      return res.status(404).json("Validation failed");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    const user = await User.findOne({
      $or: [{ email: name }, { name }],
      active: true,
    });

    if (!user) return res.status(404).json("Invalid credentials");

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) return res.status(404).json("Invalid credentials");

    const tokenInput: TokenData = {
      id: String(user._id),
      name,
      email: user.email!,
    };

    const { accessToken, refreshToken } = setTokens(tokenInput);

    setCookies(res, refreshToken);

    const { id, name: userName, role } = user;

    return res.status(200).json({
      id,
      userData: {
        name: userName,
        role,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, recapToken } = req.body;

  try {
    const recapValid = await recapValidate(recapToken);

    if (!recapValid) {
      return res.status(404).json("Validation failed");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Invalid values");
    }

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existingUser) return res.status(409).json("User already exists");

    const hashedPass = await bcrypt.hash(password, 10);

    const confirmCode = Math.floor(100000 + Math.random() * 900000);

    await new User({
      name,
      email,
      password: hashedPass,
      confirmCode,
    }).save();

    await sendEmail({
      email,
      subject: "Email confirmation",
      content: `
          <p style="
            margin: 0;
            padding: 20px 0;
            text-align: center;
            color: #fff;
          ">Welcome to Babushka! You can this use confirmation code to activate your account</p>
          <div style="
            width: 100%;
          ">
            <div 
              style="
                display: block;
                text-decoration: none;
                margin: 0 10px;
                margin-bottom: 20px;
                padding: 10px;
                background-color: #333;
                color: #fff;
                border-radius: 5px;
              "
            >
              <h2 style="margin: 0 auto">${confirmCode}</h2>
            </div>
          </div>
        `,
    });

    return res.status(200).json("Account has been successfully created");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const confirm = async (req: Request, res: Response) => {
  const confirmCode = req.body.confirmCode;

  try {
    const user = await User.findOne({ confirmCode });

    if (user) {
      user.active = true;
      await User.updateOne({ _id: user._id }, { $unset: { confirmCode: 1 } });

      await user.save();

      const tokenInput: TokenData = {
        id: String(user._id),
        name: user.name,
        email: user.email!,
      };

      const { accessToken, refreshToken } = setTokens(tokenInput);

      setCookies(res, refreshToken);

      const { id, name: userName, role } = user;

      return res.status(200).json({
        id,
        userData: {
          name: userName,
          role,
        },
        token: accessToken,
      });
    }

    return res.status(400).json("Confirmation code is incorrect");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(200).json("User is not authenticated");

    const userData = decode(token);

    if (!userData) return res.status(400).json("User data is not found");

    const user = await User.findOne({ _id: (userData as JwtPayload).id });
    if (!user) return res.status(400).json("User is not found");

    const { _id: id, name, email, role }: any = user;

    const accessToken = createToken({ id, name, email }, "15min");

    return res.status(200).json({
      id,
      userData: {
        name,
        role,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json("Logged out");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
