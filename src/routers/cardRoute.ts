import { Router } from "express";
import { createCard } from "../controllers/cardControler.js";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";


const cardRoute = Router();
cardRoute.post("/card/create", apiKeyValidation, createCard);
// cardRoute.post("/card/activate/:cardId")
// cardRoute.get("card/balance/:cardId")//pega balanço de cartão do usuário
// cardRoute.get("card/:cardId")//pega todos os cartões do usuário
// cardRoute.post("card/block/:cardId")
// cardRoute.post("card/unblock/:cardId")

export default cardRoute;