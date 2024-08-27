import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";

export interface extendedRequest extends Request {
  user?: any;
}

const validateJWT = (
  req: extendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Forbidden");
    return;
  }
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer Token not found");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid Token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid Token Payload");
      return;
    }
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validateJWT;
