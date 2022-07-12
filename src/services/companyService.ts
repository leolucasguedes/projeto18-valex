import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import * as CR from "./../repositories/companyRepository.js";

export async function findEntity(apiKey: string) {
  const result = await CR.findByApiKey(apiKey);

  if (!result) {
    throw new AppError(
      "Companie not found",
      404,
      "Companie not found",
      "Ensure to provide a valid companie key"
    );
  }

  AppLog("Service", "Companie found");
  return result;
}
