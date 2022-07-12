import Joi from "joi";

export const paymentSchema = Joi.object(
    {
        cardId: Joi.number().required(),
        password: Joi.string().length(4).regex(/^\d+$/).required(),
        amount : Joi.number().positive().required()
    }
)
