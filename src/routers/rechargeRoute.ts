import { Router } from "express";
import { apiKeyValidation } from "../middlewares/apiKeyVerificationMiddleware.js";
import { schemaValidator } from "../middlewares/schemaVerificationMiddleware.js";
import { rechargeCard } from "../controllers/rechargeControler.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRoute = Router();
rechargeRoute.post("/recharge/:id",schemaValidator(rechargeSchema), apiKeyValidation, rechargeCard);

export default rechargeRoute;