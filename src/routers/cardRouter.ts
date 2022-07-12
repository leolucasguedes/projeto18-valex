import { Router } from "express";
import * as CF from "./../controllers/cardController.js"
import validSchema from "../middlewares/schemaValidator.js";
import cardCreateSchema from "../schemas/cardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import verifyHeader from "../middlewares/headerMiddleware.js";

const cardRouter = Router();

cardRouter.post("/create", validSchema(cardCreateSchema, "/create"), verifyHeader, CF.createCard);
cardRouter.post("/activate", validSchema(activateCardSchema, "/activate"), CF.activateCard);

export default cardRouter;