import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();
userRoutes.use(authMiddleware);

export default userRoutes;
