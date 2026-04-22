import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AddressController } from "../controllers/address.controller.js";
import { CartController } from "../controllers/cart.controller.js";
import { OrderController } from "../controllers/order.controller.js";

const userRoutes = express.Router();
userRoutes.use(authMiddleware);

userRoutes.get("/addresses/query", AddressController.QUERY);
userRoutes.post("/addresses", AddressController.POST);
userRoutes.patch("/addresses/:addressId", AddressController.PATCH);
userRoutes.delete("/addresses/:addressId", AddressController.DELETE);

userRoutes.get("/carts/query", CartController.QUERY_VARIANT);
userRoutes.post("/carts/:variantId", CartController.ADD_VARIANT);
userRoutes.patch("/carts/:variantId/quantity", CartController.UPDATE_QUANTITY);
userRoutes.delete("/carts/:variantId", CartController.DELETE_VARIANT);

userRoutes.get("/orders/query", OrderController.QUERY);
userRoutes.get("/orders/get", OrderController.GET);
userRoutes.get("/orders/preview", OrderController.PREVIEW);
userRoutes.post("/orders", OrderController.POST);

export default userRoutes;
