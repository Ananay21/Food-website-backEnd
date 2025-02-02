import { Router } from "express";
import { postOrder,getOrder } from "../controllers/order.controller.js";

const router=Router();

router.route("/").post(postOrder);
router.route("/orders/:id").get(getOrder); 
export default router;