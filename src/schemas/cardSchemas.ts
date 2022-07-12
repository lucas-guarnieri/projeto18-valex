import Joi from "joi";
const transactionType = ['groceries', 'restaurant', 'transport', 'education', 'health'];

export const createCardSchema = Joi.object(
    {
        employeeId : Joi.number().required(),
        type: Joi.string().valid(...transactionType).required()
    }
);

export const activateCardSchema = Joi.object(
    {
        cardId: Joi.number().required(),
        cvv: Joi.string().length(3).required(),
        password: Joi.string().length(4).regex(/^\d+$/).required()
    }
);

export const blockUnBlockSchema = Joi.object(
    {
        cardId: Joi.number().required(),
        password: Joi.string().length(4).regex(/^\d+$/).required()
    }
);