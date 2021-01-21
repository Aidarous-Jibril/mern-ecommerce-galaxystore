import express from "express";
const router = express.Router();
import {
  addOrderToDB,
  getSingleOrder,
  setOrderToBePaid,
  getMyOrders, 
  getAllOrders,
  setOrderToDelivery
} from "../controllers/orderController.js";
import { requireAdminAccess, requireAuth } from "../middlewares/authMiddleware.js";

router.post("/", requireAuth, addOrderToDB);
router.get("/", requireAuth, requireAdminAccess, getAllOrders);
router.get("/myorders", requireAuth, getMyOrders);
router.get("/:id", requireAuth, getSingleOrder);
router.put("/:id/payment", requireAuth, setOrderToBePaid);
router.put("/:id/deliver", requireAuth, requireAdminAccess, setOrderToDelivery);

export default router;
