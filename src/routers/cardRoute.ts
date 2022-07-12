import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardControler.js";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";

//TODO: implement schema validation 
const cardRoute = Router();
cardRoute.post("/card/create", apiKeyValidation, createCard);
cardRoute.post("/card/activate", activateCard);
// cardRoute.get("card/balance/:cardId")//pega balanço de cartão do usuário

// cardRoute.post("card/block/:cardId")
// cardRoute.post("card/unblock/:cardId")

export default cardRoute;