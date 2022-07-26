import { Request, Response } from "express";

import * as AS from "./../services/activateService.js";
import * as PS from "./../services/paymentService.js"

import { Card } from "../repositories/cardRepository.js";

export async function buyPOS(req : Request, res : Response){
    const { businessId, amount }: { businessId: number; amount: number } = req.body;
    const card: Card = res.locals.card;

    AS.isCardActive(card);

    await AS.isCardExpired(card.id);
  
    await AS.isCardBlocked(card.id);

    PS.verifyCard(card, card.password)
    
    await PS.verifyBusinesses(businessId, card.type);

    await PS.verifyAmount(card.id, amount);

    await PS.insertPayment(card.id, businessId, amount);

    res.sendStatus(200);
}