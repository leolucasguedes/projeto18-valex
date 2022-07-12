import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import * as CR from "../repositories/cardRepository.js";
import * as ER from "../repositories/employeeRepository.js";

import { TransactionTypes } from "../repositories/cardRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { Card } from "../repositories/cardRepository.js";

import "./../config/setup.js";

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const CRYPTR = new Cryptr(cryptrSecret);

export async function employeeExist(id: number) {
  const result = await ER.findById(id);

  if (!result) {
    throw new AppError(
      "Employee does not exist",
      404,
      "Employee does not exist",
      "An employee needs be created to get cards"
    );
  }

  AppLog("Service", "Employee found");
  return result;
}

export async function employeeHasTheCard(type: TransactionTypes, employee: Employee) {
  const { employeeId }: any = employee;

  const employeeCard = await CR.findByTypeAndEmployeeId(type, employeeId);

  if (employeeCard) {
    throw new AppError(
      "Employee already has a card",
      403,
      "Employee already has a card",
      "An employee can only have one card"
    );
  }
  AppLog("Service", "Employee does not have a card yet");
}

export async function newCard(employee: Employee, id: number, type: TransactionTypes) {
  const creditCardNumber = faker.finance.creditCardNumber();
  const cardHolderName = formatName(employee.fullName);
  const expirationDate = formatExpirationDate();
  const cardCVV = CRYPTR.encrypt(faker.finance.creditCardCVV());

  const cardData: Card = {
    employeeId: employee.id,
    number: creditCardNumber,
    cardholderName: cardHolderName,
    securityCode: cardCVV,
    expirationDate: expirationDate,
    password: undefined,
    isVirtual: true,
    originalCardId: undefined,
    isBlocked: false,
    type: type,
  };

  return await CR.insert(cardData);
}

export function validSecurityCode(card: Card, securityCode: string) {
  const result = CRYPTR.decrypt(card.securityCode) === securityCode;

  if (!result) {
    throw new AppError(
      "Invalid security code",
      403,
      "Invalid security code",
      "Ensure to provide a valid security code"
    );
  }
  AppLog("Service", "Valid security code");

  return result;
}

function formatName(name: string) {
  const regex = /^(d[a,e,o,i])$/;
  const names = name.split(" ");
  let formattedName = "";

  if (names.length === 1) {
    formattedName = names[0];
  } else if (names.length === 2) {
    formattedName = `${names[0]} ${names[1]}`;
  } else {
    const half = Math.floor(names.length / 2);
    const firstName = names[0];
    const lastName = names[names.length - 1];
    const middleName = regex.test(names[half])
      ? names[half + 1] === lastName
        ? names[half - 1]
        : names[half + 1]
      : names[half];

    formattedName = `${firstName} ${middleName[0]} ${lastName}`;
  }

  return formattedName.toUpperCase();
}

function formatExpirationDate() {
  const year = new Date().getUTCFullYear() - 1995;
  const month = new Date().getUTCMonth();
  return `${month}/${year}`;
}
