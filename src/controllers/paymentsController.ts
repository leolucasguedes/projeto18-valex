import { Request, Response } from "express";

import * as AS from "./../services/activateService.js";
import * as PS from "./../services/paymentService.js"

import { Card } from "../repositories/cardRepository.js";

export async function buyPOS(req : Request, res : Response){
    const { businessId, amount }: { businessId: number; amount: number } = req.body;
    const card: Card = res.locals.card;

    AS.isCardAlreadyActive(card);

    AS.isCardExpired(card.id);
  
    AS.isCardBlocked(card.id);

    PS.verifyCard(card, card.password)
    
    PS.verifyBusinesses(businessId, card.type);

    PS.verifyAmount(card.id, amount);

    PS.insertPayment(card.id, businessId, amount);

    res.sendStatus(200);

}