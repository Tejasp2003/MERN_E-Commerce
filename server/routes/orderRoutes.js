import express from "express";
import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getTotalOrdersCount,
  getTotalSalesAmount,
} from "../controllers/orderController.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAsAdmin, getAllOrders);

router.route("/myorders").get(authenticate, getUserOrders);
router.route("/total-orders").get(authenticate, authorizeAsAdmin, getTotalOrdersCount);
router.route("/totalsalesamount").get(authenticate, authorizeAsAdmin, getTotalSalesAmount);
export default router;
