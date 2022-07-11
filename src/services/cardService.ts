import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import AppError from "../config/error.js";

import * as CR from "../repositories/cardRepository.js";
import * as ER from "../repositories/employeeRepository.js";

import { TransactionTypes } from "../repositories/cardRepository.js";
import { Employee } from "../repositories/employeeRepository.js";
import { Card } from "../repositories/cardRepository.js";

import "./../config/setup.js";

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
const CRYPTR = new Cryptr(cryptrSecret);

async function employeeExist(id: number) {
  const result = await ER.findById(id);

  if (!result) {
    throw new AppError(
      "Employee does not exist",
      404,
      "Employee does not exist",
      "An employee needs be created to get cards"
    );
  }
  return result;
}

async function employeeHasOnlyOneCard(type : TransactionTypes, employee : Employee) {
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
  
}

async function newCard(employee: Employee, id: number, type: TransactionTypes) {
  const creditCardNumber = faker.finance.creditCardNumber();
  const cardHolderName = formatName(employee.fullName);
  const expirationDate = formatExpirationDate();
  const cardCVV = CRYPTR.encrypt(faker.finance.creditCardCVV());

  const cardData: Card = {
    id: id,
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

export {
  employeeExist,
  employeeHasOnlyOneCard,
  newCard
};
