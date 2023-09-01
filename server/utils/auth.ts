import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({ error: "Invalid access token" });
  }

  jwt.verify(
    accessToken?.split(" ")[1],
    process.env.SECRET_KEY as string,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid access token" });
      }
      const { iat, exp, ...userData }: any = decoded;

      res.locals.userData = userData;

      next();
    }
  );
};
