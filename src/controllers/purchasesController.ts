import { Request, Response } from "express";

import * as AS from "./../services/activateService.js";
import * as PS from "./../services/purchaseService.js"

import { Card } from "../repositories/cardRepository.js";
import { CardPayment } from "../services/purchaseService.js";

export async function buyPOS(req : Request, res : Response){
    const { card, businessId, amount }: { card: CardPayment; businessId: number; amount: number } = req.body;

    const cardFound : Card = await AS.findCard(card.id);

    AS.isCardAlreadyActive(cardFound);

    AS.isCardExpired(card.id);
  
    AS.isCardBlocked(card.id);

    PS.verifyCard(cardFound, card.password)
    
    PS.verifyBusinesses(businessId, cardFound.type);

    PS.verifyAmount(card.id, amount);

    PS.insertPayment(card.id, businessId, amount);

    res.sendStatus(200);

}