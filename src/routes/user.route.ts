import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AddressController } from "../controllers/address.controller.js";

const userRoutes = express.Router();
userRoutes.use(authMiddleware);

userRoutes.get("/addresses/query", AddressController.QUERY);
userRoutes.post("/addresses", AddressController.POST);
userRoutes.patch("/addresses/:addressId", AddressController.PATCH);
userRoutes.delete("/addresses/:addressId", AddressController.DELETE);

export default userRoutes;
