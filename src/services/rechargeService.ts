import AppLog from "../events/AppLog.js";

import * as RR from "../repositories/rechargeRepository.js";
import * as PR from "../repositories/paymentRepository.js";

export async function rechargeCard(id: number, amount: number) {
  const cardId = id;
  const rechargeData = { cardId, amount };
  await RR.insert(rechargeData);

  AppLog("Service", "Recharge done");
}

export async function recharges(id: number) {
  const cardId = id;
  return await RR.findByCardId(cardId);
}

export async function transactions(id: number) {
  const cardId = id;
  return await PR.findByCardId(cardId);
  
}