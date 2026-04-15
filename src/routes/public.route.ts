import express from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { ProductController } from "../controllers/product.controller.js";

const publicRoutes = express.Router();

publicRoutes.get("/products/query", ProductController.QUERY);
publicRoutes.get("/products/get", ProductController.GET);

publicRoutes.get("/categories/query", CategoryController.QUERY);
publicRoutes.get("/categories/get", CategoryController.GET);

export default publicRoutes;
