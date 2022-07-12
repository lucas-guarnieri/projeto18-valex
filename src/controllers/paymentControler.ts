import { Request, Response } from "express";
import { paymentCardEmployee } from "../services/paymentsServices.js";

export async function cardPayment(req: Request, res: Response) {
    const businessId = parseInt(req.params.businessId);
    if (!businessId || businessId === NaN) {
        throw {
            type: "paymentError", message:"missing id", code:"422"
        }
    }
    const { cardId, password, amount } : { cardId: number, password: string, amount : number } = req.body;
    await paymentCardEmployee(businessId, cardId, password, amount);
    res.sendStatus(200);
}