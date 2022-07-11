import { Router } from "express";


const cardRoute = Router();
cardRoute.post("/card/create")
// cardRoute.post("/card/activate/:cardId")
// cardRoute.get("card/balance/:cardId")//pega balanço de cartão do usuário
// cardRoute.get("card/:cardId")//pega todos os cartões do usuário
// cardRoute.post("card/block/:cardId")
// cardRoute.post("card/unblock/:cardId")

export default cardRoute;