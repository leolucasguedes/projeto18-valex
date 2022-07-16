import bcrypt from "bcrypt"
import dayjs from "dayjs";
import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import * as CR from "../repositories/cardRepository.js";

import { Card } from "../repositories/cardRepository.js";

import "./../config/setup.js";

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export async function findCard(id: number) {
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

export function isCardAlreadyActive(card: Card) {
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

export function isCardActive(card: Card) {
  const { password } = card;
  if (password === null) {
    throw new AppError(
      "Card not active",
      404,
      "Card not active",
      "The card is not active"
    );
  }
  AppLog("Service", "Card is active");
}

export async function createPassword(card: Card, password: string) {
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

export async function activeCard(id: number, cardData: Card) {
  await CR.update(id, cardData);

  AppLog("Service", "Card activated");
}

export async function blockCard(id: number, cardDataBlocked: Card) {
  await CR.update(id, cardDataBlocked);

  AppLog("Service", "Card blocked");
}

export async function unblockCard(id: number, cardDataUnblocked: Card) {
  await CR.update(id, cardDataUnblocked);

  AppLog("Service", "Card unblocked");
}

export async function isCardExpired(id: number) {
  const card = await CR.findById(id);
  const now = dayjs("M-YY");

  if (now.isAfter(card.expirationDate)) {
    throw new AppError(
      "Card expired",
      404,
      "Card expired",
      "Ensure to provide a valid card"
    );
  }
  AppLog("Service", "Card valid");
}

export async function isCardAlreadyBlocked(id: number) {
  const card = await CR.findById(id);

  if (card.isBlocked === true) {
    throw new AppError(
      "Card already blocked",
      404,
      "Card blocked",
      "Ensure to provide a not card blocked"
    );
  }
  AppLog("Service", "Card not blocked");
}

export async function isCardBlocked(id: number) {
  const card = await CR.findById(id);

  if (card.isBlocked != true) {
    throw new AppError(
      "Card is not blocked",
      404,
      "Card not blocked",
      "Ensure to provide a blocked card to unblock "
    );
  }
  AppLog("Service", "Card can be unblock");
}