import { Router } from "express";
import * as PF from "./../controllers/purchasesController.js"
import validSchema from "../middlewares/schemaValidator.js";
import buySchema from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post("/buy", validSchema(buySchema, "/buy"), PF.buyPOS);

export default purchaseRouter;