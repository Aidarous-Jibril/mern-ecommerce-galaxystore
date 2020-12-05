import express from "express";
const router = express.Router();
import {
  addOrderToDB,
  getSingleOrder,
  setOrderToBePaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

router.post("/", requireAuth, addOrderToDB);
router.get("/myorders", requireAuth, getMyOrders);
router.get("/:id", requireAuth, getSingleOrder);
router.put("/:id/payment", requireAuth, setOrderToBePaid);

export default router;
