import { Router } from "express";
import { createCard, activateCard, getCardBalance } from "../controllers/cardControler.js";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";

//TODO: implement schema validation 
const cardRoute = Router();
cardRoute.post("/card/create", apiKeyValidation, createCard);
cardRoute.post("/card/activate", activateCard);
cardRoute.get("/card/balance/:id", getCardBalance); //pega balanço de cartão do usuário

// cardRoute.post("card/block/:cardId")
// cardRoute.post("card/unblock/:cardId")

export default cardRoute;