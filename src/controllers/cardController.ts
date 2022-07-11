import { Request, Response } from "express";
import * as CS from "./../services/cardService.js";
import * as CNS from "./../services/companyService.js"
import { Employee } from "../repositories/employeeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
  const { id, type }: { id: number, type: TransactionTypes } = req.body;
  const { apiKey } = res.locals.header

  await CNS.findEntity(apiKey);

  const employee : Employee = await CS.employeeExist(id);

  await CS.employeeHasOnlyOneCard(type, employee);

  await CS.newCard(employee, id, type);

  res.sendStatus(201);
}
