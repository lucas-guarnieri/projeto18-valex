import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { 
        createEmployeeCard, 
        activateEmployeeCard, 
        getTransacitonsBalance, 
        blockCard, 
        unblockCard 
    } from "../services/cardServices.js";


export async function createCard(req: Request, res: Response) {
    const { employeeId, type } : { employeeId : number, type: TransactionTypes } = req.body
    const { companyId } = res.locals.companyInfo;

    await createEmployeeCard(employeeId, companyId, type);

    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { cardId, cvv, password } : { cardId: number, cvv: string, password: string } = req.body;

    await activateEmployeeCard(cardId, cvv, password);
    
    res.sendStatus(200);
}

export async function getCardBalance(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    if (!cardId) {
        throw {
            type: "cardError", message:"missing id", code:"422"
        }
    }
    const balance = await getTransacitonsBalance(cardId);
    res.status(200).send(balance); 
}

export async function blockEmployeeCard(req: Request, res: Response) {
    const { cardId, password } : { cardId: number, password: string } = req.body;
    await blockCard(cardId, password);
    res.sendStatus(200);
}

export async function unblockEmployeeCard(req: Request, res: Response) {
    const { cardId, password } : { cardId: number, password: string } = req.body;
    await unblockCard(cardId, password);
    res.sendStatus(200);
}