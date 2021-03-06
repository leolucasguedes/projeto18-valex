import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import AppError from "../config/error.js";

import * as CR from "../repositories/cardRepository.js";

import { Card } from "../repositories/cardRepository.js";

export async function verifyCard(req: Request, res: Response, next: NextFunction) {
  const { password }: { password: string } = req.body;
  const { id } = req.params;

  const card: Card = await CR.findById(Number(id));

  if (!card) {
    throw new AppError(
      "Card not found",
      404,
      "Card not found",
      "Ensure to provide a valid card id"
    );
  }

  const result = await bcrypt.compare(password, card.password);
  if (result === false) {
    throw new AppError(
      "Password error",
      404,
      "Password error",
      "Ensure to provide the right password"
    );
  }

  res.locals.card = card;
  return next();
}
