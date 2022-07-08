import { Request, Response } from "express";
import * as CR from "./../repositories/cardRepository.js"

export async function createCard(req : Request, res : Response){
    res.sendStatus(200);

}