import { Router } from "express";
import * as CF from "../controllers/cardController.js"
import validSchema from "../middlewares/schemaValidator.js";
import cardCreateSchema from "../schemas/cardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import blockCardSchema from "../schemas/blockSchema.js";
import verifyHeader from "../middlewares/headerMiddleware.js";
import * as CM from "../middlewares/cardMiddleware.js"

const cardRouter = Router();

cardRouter.post("/create", validSchema(cardCreateSchema, "/create"), verifyHeader, CF.createCard);
cardRouter.post("/activate", validSchema(activateCardSchema, "/activate"), CF.activateCard);
cardRouter.post("/block", validSchema(blockCardSchema, "/block"), CM.verifyCard, CF.blockCard);
cardRouter.post("/unblock", validSchema(blockCardSchema, "/unblock"), CM.verifyCard, CF.unblockCard);

export default cardRouter;