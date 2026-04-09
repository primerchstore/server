import express from "express";
import { CategoryController } from "../controllers/category.controller.js";

const publicRoutes = express.Router();

publicRoutes.get("/categories/query", CategoryController.QUERY);

export default publicRoutes;
