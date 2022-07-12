import { Router } from "express";
import cardRoute from "./cardRoute.js";
import rechargeRoute from "./rechargeRoute.js";
import paymentRoute from "./paymentRoute.js";

const router = Router();
router.use(cardRoute);
router.use(rechargeRoute);
router.use(paymentRoute);

export default router;