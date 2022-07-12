import bcrypt from "bcrypt"
import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import * as CR from "../repositories/cardRepository.js";

import { TransactionTypes } from "../repositories/cardRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { Card } from "../repositories/cardRepository.js";

import "./../config/setup.js";

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

async function findCard(id: number) {
    const result = await CR.findById(id);
  
    if (!result) {
      throw new AppError(
        "Card does not exist",
        404,
        "Card does not exist",
        "A card needs to be created first"
      );
    }
    AppLog("Service", "Card found");
    return result;
}

function isCardAlreadyActive(card: Card) {
  const { password } = card;
  if (password != null) {
    throw new AppError(
      "Card already active",
      404,
      "Card already active",
      "The card is alrealdy active"
    );
  }
  AppLog("Service", "Card not active yet");
}

async function createPassword(card: Card, password: string) {
  const cryptPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return {
    employeeId: card.employeeId,
    number: card.number,
    cardholderName: card.cardholderName,
    securityCode: card.securityCode,
    expirationDate: card.expirationDate,
    password: cryptPassword,
    isVirtual: card.isVirtual,
    originalCardId: card.originalCardId,
    isBlocked: card.isBlocked,
    type: card.type,
  };
}

async function activeCard(id: number, cardData: Card) {
  await CR.update(id, cardData);

  AppLog("Service", "Card activated");
}

export { findCard, isCardAlreadyActive, createPassword, activeCard };