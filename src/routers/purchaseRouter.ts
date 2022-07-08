import { Router } from "express";
import * as PF from "./../controllers/purchasesController.js"

const purchaseRouter = Router();

purchaseRouter.post("/buy", PF.buyPOS);

export default purchaseRouter;