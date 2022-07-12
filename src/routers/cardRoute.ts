import { Router } from "express";
import { createCard, activateCard, getCardBalance } from "../controllers/cardControler.js";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";
import { schemaValidator } from "../middlewares/schemaVerificationMiddleware.js";
import { createCardSchema, activateCardSchema } from "../schemas/cardSchemas.js";

const cardRoute = Router();
cardRoute.post("/card/create",schemaValidator(createCardSchema), apiKeyValidation, createCard);
cardRoute.post("/card/activate",schemaValidator(activateCardSchema), activateCard);
cardRoute.get("/card/balance/:id", getCardBalance); //pega balanço de cartão do usuário

// cardRoute.post("card/block/:cardId")
// cardRoute.post("card/unblock/:cardId")

export default cardRoute;