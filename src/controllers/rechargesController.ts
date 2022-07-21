import { Request, Response } from "express";

import * as AS from "./../services/activateService.js";
import * as CNS from "./../services/companyService.js";
import * as RS from "./../services/rechargeService.js";

import { Card } from "../repositories/cardRepository.js";

export async function rechargeCard(req: Request, res: Response) {
  const { id, amount }: { id: number; amount: number } = req.body;
  const apiKey = res.locals.header;

  await CNS.findCompany(apiKey);

  const card: Card = await AS.findCard(id);

  AS.isCardActive(card);

  AS.isCardExpired(id);

  AS.isCardBlocked(id);

  RS.rechargeCard(id, amount);

  res.sendStatus(200);
}