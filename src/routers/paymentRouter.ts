import { Router } from "express";
import * as PF from "../controllers/paymentsController.js"
import validSchema from "../middlewares/schemaValidator.js";
import buySchema from "../schemas/paymentSchema.js";
import * as CM from "../middlewares/cardMiddleware.js"

const paymentRouter = Router();

paymentRouter.post("/card/:id/payment", validSchema(buySchema, "/payment"), CM.verifyCard, PF.buyPOS);

export default paymentRouter;