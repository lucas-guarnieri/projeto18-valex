import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { createEmployeeCard } from "../services/cardServices.js";




export async function createCard(req: Request, res: Response) {
    const { employeeId, type } : {employeeId : number, type: TransactionTypes} = req.body
    const { companyId } = res.locals.id;

    await createEmployeeCard(employeeId, companyId, type);

    res.sendStatus(201);
}