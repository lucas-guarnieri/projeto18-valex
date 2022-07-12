import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as rechargesServices from "./../services/rechargesServices.js"

export async function rechargeCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    if (!cardId || cardId === NaN) {
        throw {
            type: "rechargeError", message:"missing id", code:"422"
        }
    }
    const { amount } : { amount : number } = req.body
    const { companyId } = res.locals.companyInfo;
    await rechargesServices.rechargeCardEmployee(cardId, amount);
    res.sendStatus(200);
}