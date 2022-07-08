import { Router } from "express";
import * as RF from "./../controllers/rechargesController.js"

const rechargeRouter = Router();

rechargeRouter.post("/create", RF.rechargeCard);

export default rechargeRouter;