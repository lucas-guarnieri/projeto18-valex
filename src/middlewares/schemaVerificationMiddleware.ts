import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function schemaValidator (schema : ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            throw {
                type: "validationError", message:error.details.map((detail) => detail.message), code:"422"
            }
        }
        next();
    };

}