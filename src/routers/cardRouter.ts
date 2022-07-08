import { Router } from "express";
import * as CF from "./../controllers/cardController.js"

const cardRouter = Router();

cardRouter.post("/create", CF.createCard);

export default cardRouter;