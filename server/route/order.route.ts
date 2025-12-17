import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrdersAdmin } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", updateAccessToken, isAuthenticated, createOrder);

orderRouter.get("/get-orders", updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllOrdersAdmin);


export default orderRouter;