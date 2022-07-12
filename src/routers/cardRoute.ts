import { Router } from "express";
import { createCard, activateCard, getCardBalance, blockEmployeeCard, unblockEmployeeCard } from "../controllers/cardControler.js";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";
import { schemaValidator } from "../middlewares/schemaVerificationMiddleware.js";
import { createCardSchema, activateCardSchema, blockUnBlockSchema } from "../schemas/cardSchemas.js";

const cardRoute = Router();
cardRoute.post("/card/create",schemaValidator(createCardSchema), apiKeyValidation, createCard);
cardRoute.post("/card/activate",schemaValidator(activateCardSchema), activateCard);
cardRoute.get("/card/balance/:id", getCardBalance); //pega balanço de cartão do usuário
cardRoute.put("/card/block", schemaValidator(blockUnBlockSchema), blockEmployeeCard);
cardRoute.put("/card/unblock", schemaValidator(blockUnBlockSchema), unblockEmployeeCard)


export default cardRoute;