import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import * as BR from "../repositories/businessRepository.js";
import * as PR from "../repositories/paymentRepository.js";
import * as RR from "../repositories/rechargeRepository.js";

import { Card } from "../repositories/cardRepository.js";
import { PaymentInsertData } from "../repositories/paymentRepository.js";
import { Recharge } from "../repositories/rechargeRepository.js";

export interface CardPayment {
    id: number;
    password: string;
  }

export function verifyCard(cardFound: Card, password: string) {
  if (password != cardFound.password) {
    throw new AppError(
      "Card invalid",
      401,
      "Card invalid",
      "Ensure to provide the right password"
    );
  }
  AppLog("Service", "Card valid");
}

export async function verifyBusinesses(id: number, type: string) {
  const businesses = await BR.findById(id);
  if (businesses.type != type) {
    throw new AppError(
      "Businesses type not valid",
      404,
      "Businesses type not valid",
      "Ensure to buy in a valid businesses "
    );
  }
  AppLog("Service", "Businesses found");
}

export async function verifyAmount(id: number, amount: number) {
  const recharge = await RR.findByCardId(id);

  if (+recharge < amount) {
    throw new AppError(
      "Amount not enough",
      404,
      "Amount not enough",
      "Ensure to recharge your card before buy"
    );
  }

  AppLog("Service", "Amount ok");
}

export async function insertPayment(id: number, businessId : number, amount: number) {
  const cardId = id;
  const paymentData: PaymentInsertData = {
    cardId,
    businessId,
    amount,
  };
  await PR.insert(paymentData);

  AppLog("Service", "Payment done");
}