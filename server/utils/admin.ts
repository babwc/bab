import { Request, Response, NextFunction } from "express";

import User from "../model/User";

export const isAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.userData.id;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }

  if (user.role !== "admin") {
    return res.status(400).json({ error: "Admin only" });
  }

  next();
};
