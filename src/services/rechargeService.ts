import AppLog from "../events/AppLog.js";

import * as RR from "../repositories/rechargeRepository.js";

export async function rechargeCard(id: number, amount: number) {
  const cardId = id;
  const rechargeData = { cardId, amount };
  await RR.insert(rechargeData);

  AppLog("Service", "Recharge done");
}