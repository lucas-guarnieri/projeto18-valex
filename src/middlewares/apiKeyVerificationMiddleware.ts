import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js"

export async function apiKeyValidation(req: Request, res: Response, next: NextFunction ) {
    const apiKey = req.header("x-api-key");
    
    if (!apiKey) {
        throw {
            type: "apiValidationError", message: "valid apiKey missing", code: "400"
        }
    }

    const company  = await findByApiKey(apiKey);
    if (!company) {
        throw {
            type: "apiValidationError", message: "invalid api", code: "401"
        }
    }

    res.locals.companyId = {id: company.id }

    next()
}