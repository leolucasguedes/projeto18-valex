import { Router } from "express";
import * as RF from "./../controllers/rechargesController.js"
import validSchema from "../middlewares/schemaValidator.js";
import rechargeSchema from "../schemas/rechargeSchema.js";
import verifyHeader from "../middlewares/headerMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post("/card/recharge", validSchema(rechargeSchema, "recharge"), verifyHeader, RF.rechargeCard);

export default rechargeRouter;