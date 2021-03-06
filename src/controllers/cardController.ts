import { Request, Response } from "express";
import * as CS from "./../services/cardService.js";
import * as RS from "./../services/rechargeService.js";
import * as CNS from "./../services/companyService.js";
import * as AS from "./../services/activateService.js";
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { Card } from "../repositories/cardRepository.js";

import AppLog from "../events/AppLog.js";

export async function createCard(req: Request, res: Response) {
  const { id, type }: { id: number; type: TransactionTypes } = req.body;
  const apiKey = res.locals.header;

  await CNS.findCompany(apiKey);

  const employee: Employee = await CS.employeeExist(id);

  await CS.employeeHasTheCard(type, employee);

  const cvv = await CS.newCard(employee, id, type);

  AppLog("Controller", "Card create");

  res.status(201).send({cvv});
}

export async function activateCard(req: Request, res: Response) {
  const { securityCode, password }: { securityCode : string; password : string  } = req.body;
  const { id } = req.params;

  const card: Card = await AS.findCard(Number(id));

  AS.isCardAlreadyActive(card);

  CS.validSecurityCode(card, securityCode)

  const cardData = await AS.createPassword(card, password);

  await AS.activeCard(Number(id), cardData)

  AppLog("Controller", "Card active");

  res.sendStatus(201);
}

export async function blockCard(_req: Request, res: Response) {
  const card: Card = res.locals.card;

  AS.isCardActive(card);

  await AS.isCardExpired(card.id);

  await AS.isCardNotBlocked(card.id);

  const cardDataBlocked = { ...card, isBlocked: true };

  await AS.blockCard(card.id, cardDataBlocked);

  AppLog("Controller", "Card block");

  return res.sendStatus(200);
}

export async function unblockCard(_req: Request, res: Response) {
  const card: Card = res.locals.card;

  await AS.isCardExpired(card.id);

  await AS.isCardBlocked(card.id);

  const cardDataUnblocked = { ...card, isBlocked: false };

  await AS.unblockCard(card.id, cardDataUnblocked);

  AppLog("Controller", "Card unblock");

  return res.sendStatus(200);
}

export async function getCardStatements(req: Request, res: Response){
	const { id } = req.params;

  const card: Card = await AS.findCard(Number(id));

  const transactions = await RS.transactions(Number(id));

  const recharges = await RS.recharges(Number(id));

  const balance = await CS.getBalance(transactions, recharges)

	res.status(200).send({balance, transactions, recharges});
}