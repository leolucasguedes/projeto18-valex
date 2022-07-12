import { Request, Response } from "express";
import * as CS from "./../services/cardService.js";
import * as CNS from "./../services/companyService.js";
import * as AS from "./../services/activateService.js";
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { Card } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
  const { id, type }: { id: number; type: TransactionTypes } = req.body;
  const apiKey = res.locals.header;

  await CNS.findCompany(apiKey);

  const employee: Employee = await CS.employeeExist(id);

  await CS.employeeHasTheCard(type, employee);

  await CS.newCard(employee, id, type);

  res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
  const { id, securityCode, password }: { id: number; securityCode : string; password : string  } = req.body;

  const card: Card = await AS.findCard(id);

  AS.isCardAlreadyActive(card);

  CS.validSecurityCode(card, securityCode)

  const cardData = await AS.createPassword(card, password);

  await AS.activeCard(id, cardData)

  res.sendStatus(201);
}

export async function blockCard(_req: Request, res: Response) {
  const card: Card = res.locals.card;

  AS.isCardAlreadyActive(card);

  AS.isCardExpired(card.id);

  AS.isCardBlocked(card.id);

  const cardDataBlocked = { ...card, isBlocked: true };

  await AS.blockCard(card.id, cardDataBlocked);

  return res.sendStatus(200);
}

export async function unblockCard(_req: Request, res: Response) {
  const card: Card = res.locals.card;

  AS.isCardExpired(card.id);

  const cardDataUnblocked = { ...card, isBlocked: false };
  await AS.unblockCard(card.id, cardDataUnblocked);

  return res.sendStatus(200);
}
