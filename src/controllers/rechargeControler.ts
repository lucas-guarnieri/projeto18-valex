import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as rechargesServices from "./../services/rechargesServices.js"

export async function rechargeCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    const { amount } : { amount : number } = req.body
    const { companyId } = res.locals.companyInfo;
    await rechargesServices.rechargeCardEmployee(cardId, amount);
    res.sendStatus(200);
}