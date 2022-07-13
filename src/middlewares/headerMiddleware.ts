import { Request, Response, NextFunction } from "express";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

function verifyHeader(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"].toString();

  if (!apiKey) {
    throw new AppError(
      "Missing headers",
      400,
      "Missing headers",
      "Ensure to provide the necessary headers"
    );
  }

  AppLog("Middleware", `Header processed`);
  res.locals.header = apiKey;
  return next();
}

export default verifyHeader;
