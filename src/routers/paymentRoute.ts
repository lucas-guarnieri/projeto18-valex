import { Router } from "express";
import { schemaValidator } from "../middlewares/schemaVerificationMiddleware.js";
import { cardPayment } from "../controllers/paymentControler.js";
import { paymentSchema } from "../schemas/paymentSchema.js";

const paymentRoute = Router();
paymentRoute.post("/payment/:businessId", schemaValidator(paymentSchema), cardPayment);

export default paymentRoute;
